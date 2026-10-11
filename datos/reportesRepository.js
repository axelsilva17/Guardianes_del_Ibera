/** Local JSON persistence for the single-process prototype. */
import { mkdirSync, readFileSync, writeFileSync, renameSync } from 'node:fs'
import { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { seedReportes } from './seed.js'
const file = process.env.REPORTES_FILE || fileURLToPath(new URL('./storage/reportes.json', import.meta.url))
function persist(records) {
  mkdirSync(dirname(file), { recursive: true })
  writeFileSync(`${file}.tmp`, JSON.stringify(records, null, 2), 'utf8')
  renameSync(`${file}.tmp`, file)
}
function load() {
  let records
  try {
    records = JSON.parse(readFileSync(file, 'utf8').replace(/^\uFEFF/, ''))
    if (!Array.isArray(records) || records.some(r => !r || typeof r.id !== 'string')) throw new Error('Archivo de reportes inválido')
  } catch (error) {
    if (error.code !== 'ENOENT') throw error
    records = seedReportes.map(r => ({ ...r }))
  }
  records = records.map((r, index) => ({ ...r, numero: r.numero || index + 1,
    ...(!r.autorId && !seedReportes.some(seed => seed.id === r.id) && ['Anonimo', 'Anónimo', 'Sofía Martínez'].includes(r.autor) ? { autorId: 'sofia-demo', autor: 'Sofía Martínez' } : {}),
  }))
  persist(records)
  return records
}
let reportes = load()
export function list() { return reportes.map(r => ({ ...r })) }
export function findById(id) { const r = reportes.find(r => r.id === id); return r ? { ...r } : null }
export function create(data) {
  const record = { ...data }
  const next = [...reportes, record]
  persist(next)
  reportes = next
  return { ...record }
}
