# Schliere Lacht Website

[![CI Build](https://github.com/sjucker/schlierelacht-website/actions/workflows/workflow.yml/badge.svg?branch=main)](https://github.com/sjucker/schlierelacht-website/actions/workflows/workflow.yml)

## Netlify

### Prod

* [https://schlierelacht.netlify.app](https://schlierelacht.netlify.app)
* [https://app.netlify.com/projects/schlierelacht/overview](https://app.netlify.com/projects/schlierelacht/overview)
* [![Netlify Status](https://api.netlify.com/api/v1/badges/c0f9a25e-9037-4ec0-a38c-83aae986ae62/deploy-status)](https://app.netlify.com/projects/schlierelacht/deploys)

### Staging

* [https://schlierelacht-staging.netlify.app](https://schlierelacht-staging.netlify.app)
* [https://app.netlify.com/projects/schlierelacht-staging/overview](https://app.netlify.com/projects/schlierelacht-staging/overview)
* [![Netlify Status](https://api.netlify.com/api/v1/badges/a4fb37c1-8dbd-49cd-bb25-78c80baf841f/deploy-status)](https://app.netlify.com/projects/schlierelacht-staging/deploys)

### Environment Variables

The project requires environment variables for local development and deployment. Copy `.env.example` to `.env` and fill in the values:

### Netlify Deployment

* [Prod](https://app.netlify.com/projects/schlierelacht/configuration/env#environment-variables)
* [Staging](https://app.netlify.com/projects/schlierelacht-staging/configuration/env#environment-variables)

### Password protection (staging only)

The free Netlify plan has no built-in password protection, so
`netlify/edge-functions/password-protect.ts` implements HTTP Basic Auth. It is
activated purely by environment variables, so the same code is deployed to both
sites:

* **Staging** — set `SITE_PASSWORD` (required) and optionally `SITE_USERNAME`
  (defaults to `schliere`) in the staging site's environment variables. Every
  request is then challenged with Basic Auth.
* **Prod** — leave `SITE_PASSWORD` unset. The edge function short-circuits and
  passes all requests through, so prod stays fully open.

To change or lift protection, edit the env vars in the Netlify UI and redeploy —
no code change needed.

## Updating

* `npm run upgrade-nuxt`
* `npm run upgrade-interactive`
* `npm run build`
* `npm run lint`
* `npm run lint:fix`
