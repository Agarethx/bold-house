/** Plain text from Sanity portable text blocks or legacy string (migration). */
export function portableTextToPlain(value) {
  if (value == null) return ''
  if (typeof value === 'string') return value
  if (!Array.isArray(value)) return ''
  return value
    .filter((block) => block._type === 'block')
    .map((block) =>
      (block.children || []).map((child) => child.text || '').join('')
    )
    .join('\n')
    .trim()
}
