import type {Config} from '@netlify/edge-functions'

/**
 * HTTP Basic Auth gate for staging (Netlify free plan has no built-in password protection).
 *
 * Activation is controlled purely by env vars, so the SAME code is deployed to both sites:
 *   - Staging site: set `SITE_PASSWORD` (and optionally `SITE_USERNAME`) in the Netlify UI
 *     → every request is challenged with Basic Auth.
 *   - Prod site: leave `SITE_PASSWORD` unset → this function passes all requests through untouched.
 *
 * Set the env vars under: Site configuration → Environment variables (staging site only).
 */
export default async function passwordProtect(request: Request) {
    const password = Netlify.env.get('SITE_PASSWORD')

    // No password configured (e.g. production) → do nothing, let the request continue.
    if (!password) {
        return
    }

    const username = Netlify.env.get('SITE_USERNAME') || 'schliere'
    const expected = 'Basic ' + btoa(`${username}:${password}`)
    const provided = request.headers.get('authorization') || ''

    if (provided === expected) {
        return // authenticated → continue to the site
    }

    return new Response('Authentication required', {
        status: 401,
        headers: {
            'WWW-Authenticate': 'Basic realm="Schliere Lacht (Staging)", charset="UTF-8"',
            'Cache-Control': 'no-store',
        },
    })
}

export const config: Config = {
    // Guard everything. On prod the function short-circuits immediately (no SITE_PASSWORD).
    path: '/*',
}
