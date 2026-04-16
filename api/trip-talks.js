import data from '../src/data/exported/trip-talks.json' assert { type: 'json' }

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')

  const limit = Math.min(Number(req.query.limit || 30), 200)
  const offset = Number(req.query.offset || 0)
  const city = req.query.city?.toLowerCase()

  let filtered = data

  if (city) {
    filtered = data.filter((row) =>
      row.depth1?.toLowerCase().includes(city) ||
      row.city?.toLowerCase().includes(city) ||
      row.cityEn?.toLowerCase().includes(city)
    )
  }

  const sliced = filtered.slice(offset, offset + limit)

  res.status(200).json({ success: true, data: sliced })
}
