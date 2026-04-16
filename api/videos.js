import data from '../src/data/exported/videos.json' assert { type: 'json' }

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  const limit = Math.min(Number(req.query.limit || 5), 20)
  const city = req.query.city?.toLowerCase()

  let filtered = data

  if (city) {
    filtered = data.filter((row) =>
      row.depth1?.toLowerCase().includes(city) ||
      row.city?.toLowerCase().includes(city) ||
      row.cityEn?.toLowerCase().includes(city)
    )
  }

  // 랜덤 5개 선택
  const shuffled = filtered.sort(() => Math.random() - 0.5)
  const sliced = shuffled.slice(0, limit)

  res.status(200).json({ success: true, data: sliced })
}
