export function formatDate(date: string | Date): string {
  if (typeof date === 'string')
    date = new Date(date)

  return new Intl.DateTimeFormat('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date)
}

export function toISOString(date: Date | string): string {
  if (typeof date === 'string')
    date = new Date(date)

  return date.toISOString()
}
