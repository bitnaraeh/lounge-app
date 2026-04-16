export default async function handler(req, res) {
  try {
    const { readFileSync } = await import('fs')
    const { join } = await import('path')
    const cwd = process.cwd()
    const files = readFileSync(join(cwd, 'src/data/exported/trip-talks.json'), 'utf-8')
    res.status(200).json({ ok: true, cwd, length: files.length })
  } catch (e) {
    res.status(200).json({ ok: false, error: e.message, cwd: process.cwd() })
  }
}
