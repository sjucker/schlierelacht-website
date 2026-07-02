export default function (date: string) {
    if (!date) return ''
    const [year, month, day] = date.split('-')
    if (!year || !month || !day) return date

    const d = new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    const weekday = new Intl.DateTimeFormat('de-CH', {weekday: 'long'}).format(d)

    return `${weekday}, ${day}.${month}.${year}`
}
