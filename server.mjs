import mysql from 'mysql2/promise'
import { createServer } from 'http'
import { URL } from 'url'

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 40007,
  user: process.env.DB_USER || 'analytics-service',
  password: process.env.DB_PASSWORD || 'vK3GZcreq_ND',
  database: process.env.DB_NAME || 'metatrip',
  charset: process.env.DB_CHARSET || 'utf8mb4',
  connectionLimit: 5,
})

function json(res, data, status = 200) {
  res.writeHead(status, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' })
  res.end(JSON.stringify(data))
}

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost`)

  if (url.pathname === '/api/trip-talks') {
    try {
      const limit = Math.min(Number(url.searchParams.get('limit') || 30), 100)
      const offset = Number(url.searchParams.get('offset') || 0)
      const city = url.searchParams.get('city') // 예: '오사카'

      const cityFilter = city
        ? `AND (reg.depth_1 LIKE ? OR h.city LIKE ? OR h.city_en LIKE ?)`
        : ''
      const cityParams = city ? [`%${city}%`, `%${city}%`, `%${city}%`] : []

      const [rows] = await pool.query(
        `SELECT
          tt.id,
          tt.title,
          tt.contents AS body,
          tt.created_date,
          tc.title AS category_title,
          reg.country_name AS region,
          reg.depth_1,
          h.city,
          h.city_en,
          h.name AS hotel_name,
          h.thumbnail AS hotel_thumbnail,
          COUNT(DISTINCT rp.id) AS reply_count,
          (SELECT tti.image_url FROM trip_talk_image tti
            WHERE tti.trip_talk_id = tt.id AND tti.service_yn = 1
            ORDER BY tti.sort LIMIT 1) AS thumbnail_url
        FROM trip_talk tt
        LEFT JOIN trip_talk_category tc
          ON tt.category_id = tc.id AND tc.language = 'ko'
        LEFT JOIN hotel h
          ON tt.contents_id = h.id AND tt.contents_type = 'H'
        LEFT JOIN region reg
          ON h.region_id = reg.id
        LEFT JOIN trip_talk_reply rp
          ON rp.trip_talk_id = tt.id AND rp.service_yn = 1
        WHERE tt.service_yn = 1 ${cityFilter}
        GROUP BY tt.id
        ORDER BY tt.created_date DESC
        LIMIT ? OFFSET ?`,
        [...cityParams, limit, offset]
      )

      const CATEGORY_MAP = {
        '숙소 후기': '숙소후기',
        '여행 후기': '여행후기',
        '궁금해요': '궁금해요',
        '일상 수다': '일상수다',
        '동행 모집': '동행모집',
      }

      const ASSET_BASE = 'https://asset.tripbtoz.com'
      const toUrl = (url) => {
        if (!url) return ''
        return url.startsWith('http') ? url : ASSET_BASE + url
      }

      const data = rows.map((row, i) => ({
        id: row.id,
        title: row.title || '',
        body: row.body || '',
        category: CATEGORY_MAP[row.category_title] || row.category_title || '기타',
        region: row.region || '',
        depth1: row.depth_1 || '',
        city: row.city || '',
        cityEn: row.city_en || '',
        hotelName: row.hotel_name || '',
        thumbnailUrl: toUrl(row.thumbnail_url) || toUrl(row.hotel_thumbnail),
        likeCount: 0,
        commentCount: Number(row.reply_count),
        bookmarkCount: 0,
        createdDate: row.created_date,
        avatarUrl: `https://i.pravatar.cc/80?img=${(i % 70) + 1}`,
      }))

      json(res, { success: true, data })
    } catch (err) {
      console.error('[API] trip-talks error:', err.message)
      json(res, { success: false, error: err.message }, 500)
    }
    return
  }

  if (url.pathname === '/api/lounge-notices') {
    try {
      const [rows] = await pool.query(
        `SELECT id, label, title, content
         FROM lounge_notice
         WHERE service_yn = 1 AND language = 'ko'
           AND start_date <= NOW() AND end_date >= NOW()
         ORDER BY display_order ASC
         LIMIT 5`
      )
      json(res, { success: true, data: rows })
    } catch (err) {
      console.error('[API] lounge-notices error:', err.message)
      json(res, { success: false, error: err.message }, 500)
    }
    return
  }

  if (url.pathname === '/api/videos') {
    try {
      const limit = Math.min(Number(url.searchParams.get('limit') || 5), 20)
      const city = url.searchParams.get('city')

      const cityFilter = city
        ? `AND (reg.depth_1 LIKE ? OR h.city LIKE ? OR h.city_en LIKE ?)`
        : ''
      const cityParams = city ? [`%${city}%`, `%${city}%`, `%${city}%`] : []

      const [rows] = await pool.query(
        `SELECT
          v.id,
          v.contents AS caption,
          vs.video_domain,
          vs.video_url,
          vs.image_domain,
          vs.thumbnail,
          h.name AS hotel_name,
          h.city,
          h.city_en,
          reg.depth_1,
          reg.country_name
        FROM video v
        JOIN video_source vs ON vs.video_id = v.id AND vs.video_format = 'mp4'
        LEFT JOIN hotel h ON v.contents_id = h.id AND v.contents_type = 'H'
        LEFT JOIN region reg ON h.region_id = reg.id
        WHERE v.service_yn = 1 AND vs.thumbnail IS NOT NULL ${cityFilter}
        ORDER BY RAND()
        LIMIT ?`,
        [...cityParams, limit]
      )

      const data = rows.map((row) => ({
        id: row.id,
        caption: row.caption || '',
        hotelName: row.hotel_name || '',
        city: row.city || '',
        cityEn: row.city_en || '',
        depth1: row.depth_1 || '',
        videoUrl: row.video_domain + row.video_url,
        thumbnailUrl: row.image_domain + row.thumbnail,
      }))

      json(res, { success: true, data })
    } catch (err) {
      console.error('[API] videos error:', err.message)
      json(res, { success: false, error: err.message }, 500)
    }
    return
  }

  res.writeHead(404)
  res.end('Not found')
})

server.listen(3001, () => {
  console.log('[API server] http://localhost:3001')
})
