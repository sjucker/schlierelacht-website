import type {AttractionDTO} from "~/../shared/types/rest";
import formatDate from "~/utils/format-date";
import formatTime from "~/utils/format-time";

export default function (artist: AttractionDTO): string | undefined {
    if (!artist.programm?.length) return undefined
    const entry = artist.programm[0]
    if (!entry) return undefined
    return `${formatDate(entry.fromDate)}${entry.fromTime ? ' ab ' + formatTime(entry.fromTime) : ''}`
}
