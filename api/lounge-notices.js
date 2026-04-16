import data from '../src/data/exported/notices.json' assert { type: 'json' }

export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.status(200).json({ success: true, data })
}
