// An ISO date (yyyy-MM-dd) without its weekday, e.g. "03.09.2027".
export default function (date: string) {
    if (!date) return ''
    const [year, month, day] = date.split('-')
    if (!year || !month || !day) return date

    return `${day}.${month}.${year}`
}
