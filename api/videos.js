import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const data = JSON.parse(readFileSync(join(__dirname, '../src/data/exported/videos.json'), 'utf-8'))

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

  const shuffled = [...filtered].sort(() => Math.random() - 0.5)
  res.status(200).json({ success: true, data: shuffled.slice(0, limit) })
}
