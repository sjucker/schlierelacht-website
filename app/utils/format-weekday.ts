// Weekday name of an ISO date (yyyy-MM-dd), e.g. "Freitag".
export default function (date: string) {
    if (!date) return ''
    const [year, month, day] = date.split('-')
    if (!year || !month || !day) return ''

    const d = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    return new Intl.DateTimeFormat('de-CH', {weekday: 'long'}).format(d)
}
