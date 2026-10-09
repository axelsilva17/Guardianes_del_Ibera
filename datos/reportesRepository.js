/**
 * DATA layer — in-memory repository.
 *
 * This is the ONLY module allowed to touch the raw collection.
 * Every read returns a copy so callers cannot mutate stored records.
 */

import { seedReportes } from './seed.js'

/** Raw in-memory collection. Start from a shallow copy of the seed. */
const reportes = seedReportes.map((reporte) => ({ ...reporte }))

/**
 * Return all reports.
 * @returns {import('./seed.js').Reporte[]}
 */
export function list() {
  return reportes.map((reporte) => ({ ...reporte }))
}

/**
 * Find a report by id.
 * @param {string} id
 * @returns {import('./seed.js').Reporte | null}
 */
export function findById(id) {
  const match = reportes.find((reporte) => reporte.id === id)
  return match ? { ...match } : null
}

/**
 * Store a new report.
 * @param {import('./seed.js').Reporte} data - already-built record (id and defaults resolved by the logic layer)
 * @returns {import('./seed.js').Reporte}
 */
export function create(data) {
  const record = { ...data }
  reportes.push(record)
  return { ...record }
}
