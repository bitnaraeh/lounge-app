import { readFileSync } from 'fs'
import { join } from 'path'

const data = JSON.parse(readFileSync(join(process.cwd(), 'src/data/exported/notices.json'), 'utf-8'))

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200).json({ success: true, data })
}
