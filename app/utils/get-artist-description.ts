import type {AttractionDTO} from "~/../shared/types/rest";
import formatDate from "~/utils/format-date";
import formatTime from "~/utils/format-time";

export default function (artist: AttractionDTO): string | undefined {
    if (!artist.programm?.length) return undefined
    const today = new Date().toISOString().slice(0, 10)
    const next = artist.programm
        .filter(p => p.fromDate >= today)
        .sort((a, b) => {
            const dateCmp = a.fromDate.localeCompare(b.fromDate)
            if (dateCmp !== 0) return dateCmp
            return (a.fromTime ?? '').localeCompare(b.fromTime ?? '')
        })[0]
    if (!next) return undefined
    return `${formatDate(next.fromDate)}${next.fromTime ? ' ab ' + formatTime(next.fromTime) : ''}`
}
