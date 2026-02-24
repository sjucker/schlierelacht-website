export default function (time: string) {
    if (!time) return ''
    const parts = time.split(':')
    if (parts.length < 2) return time
    const [hours, minutes] = parts
    return `${hours}:${minutes}`
}
