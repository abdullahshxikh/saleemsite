# Saleem Shaikh for Cambridge Ward 1

A multi-page local campaign website built with React, TypeScript, and Vite.

## Requirements

- Node.js 24
- npm

## Local development

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

Run the full validation suite with `npm run check`.

## Deploying to Vercel

Import this GitHub repository into Vercel and keep the detected Vite defaults. The checked-in `vercel.json` pins the build command and output directory and rewrites browser-history routes to `index.html`, so pages such as `/ward-1` work when opened directly.

Before launch, submit each form once and confirm the activation message FormSubmit sends to `elect@samshaikh.ca`.

## Forms

Volunteer and survey forms submit through FormSubmit's AJAX endpoint to `elect@samshaikh.ca`, with a honeypot, pending/success/error feedback, and no mail-app handoff. FormSubmit requires the destination inbox to confirm the form once before it begins forwarding submissions. Do not launch until that activation email has been confirmed and the campaign has approved the privacy wording.

FormSubmit retains submissions under its own service terms. Review its privacy and retention policy before deployment.

## Ward map

The interactive Ward 1 map uses a project-local copy of the official City of Cambridge Open Data ward boundary and OpenStreetMap tiles. Re-check the boundary dataset before deployment if the City publishes an update.

## Content notes

- Official voting details were checked against the City of Cambridge website on September 12, 2026.
- Re-check all election dates, locations, legal authorization language, and candidate contact details before deployment.
- Source photos are retained under `source-images`; only optimized site assets are served from `public/images`.
