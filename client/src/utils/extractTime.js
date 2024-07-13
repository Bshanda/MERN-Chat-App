export function extractTime (dateString) {
  const date = new Date(dateString)
  const dateOfMonth = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const hours = padZero(date.getHours())
  const minutes = padZero(date.getMinutes())
  return `${hours}:${minutes}, ${dateOfMonth}-${month}-${year}`
}

// Helper function to pad single-digit numbers with a leading zero
function padZero (number) {
  return number.toString().padStart(2, '0')
}
