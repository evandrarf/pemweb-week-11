/**
 * Formats a number to Indonesian Rupiah currency format.
 * Matches slide format: 'Rp5.000', 'Rp12.000'
 * @param {number|string} value
 * @returns {string}
 */
export function formatRupiah(value) {
  const num = typeof value === 'number' ? value : Number(value)
  if (isNaN(num)) return 'Rp0'
  return `Rp${num.toLocaleString('id-ID')}`
}

/**
 * Parses raw input string into integer price.
 * @param {string} value
 * @returns {number}
 */
export function parsePrice(value) {
  const cleaned = String(value).replace(/[^0-9]/g, '')
  return cleaned ? parseInt(cleaned, 10) : 0
}
