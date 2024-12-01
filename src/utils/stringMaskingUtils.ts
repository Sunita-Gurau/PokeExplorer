/**
 * Convert to Title case.
 * @param {string} text - generation-pi | generation_pi
 * @returns {string} - Generation Pi.
 */
export const convertToTitleCase = (text?: string): string | undefined => {
  if (!text) return
  return text
    .toLowerCase()
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}
