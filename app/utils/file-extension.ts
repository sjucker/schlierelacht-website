// Upper-cased file extension from a filename, e.g. "logo.PDF" → "PDF". Empty when none.
export default function (filename: string): string {
    const ext = filename.split('.').pop()
    return ext ? ext.toUpperCase() : ''
}
