import formatDateShort from './format-date-short'
import formatWeekday from './format-weekday'

// Full date with weekday, e.g. "Freitag, 03.09.2027".
export default function (date: string) {
    const weekday = formatWeekday(date)
    const short = formatDateShort(date)

    return weekday ? `${weekday}, ${short}` : short
}
