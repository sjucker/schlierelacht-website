// The API version each public endpoint is pinned to.
//
// The backend versions its resources independently, so only the entry whose
// contract actually broke moves — the rest stay where they are. Bumping an
// entry here is what decouples the two website branches from the backend's
// single `main`: `main` (PROD) can keep talking to v1 while `develop`
// (STAGING) already talks to the v2 of one endpoint.
const API_VERSION = {
    attraction: 'v1',
    downloads: 'v1',
    gallery: 'v1',
    location: 'v1',
    meetup: 'v1',
    news: 'v1',
    ok: 'v1',
    programm: 'v1',
    sponsoring: 'v1',
} as const

export type ApiResource = keyof typeof API_VERSION

// Base path of a versioned public API endpoint, to be appended to
// `config.public.apiBaseUrl`: apiPath('news') -> "/api/v1/news". Sub-paths and
// query strings are appended by the caller as before.
export default function (resource: ApiResource) {
    return `/api/${API_VERSION[resource]}/${resource}`
}
