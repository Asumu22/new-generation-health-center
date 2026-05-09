# Cloudflare Pages Deployment Guide

## Production Build

- Run `npm run build` to produce the optimized `dist/` output.
- The project is configured for static SPA hosting with hash-based routing.
- Use `VITE_SITE_URL` in `.env` to generate canonical URLs and meta tags.

## Environment Variables

Create a `.env` file with the following values:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_CLOUDINARY_CLOUD_NAME`
- `VITE_CLOUDINARY_UPLOAD_PRESET`
- `VITE_SITE_URL`

Keep `.env` out of source control.

## SPA Routing

This site uses hash routing (`#/about`, `#/contact`) to avoid server-side route rewrites.
For Cloudflare Pages, no extra redirects are required for public page navigation.

## Security Headers

For best results, enable the following response headers in Cloudflare Page Rules:

- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-XSS-Protection: 1; mode=block`
- `Permissions-Policy: geolocation=(), microphone=(), camera=()`

## Caching Recommendations

- Cache static assets with long-lived headers; use fingerprinted file names from Vite.
- Set HTML to revalidate frequently or use Cloudflare cache-control rules for `index.html`.
- Keep API calls and dynamic Supabase endpoints uncached at edge if they require fresh auth state.

## Free Tier Optimizations

- Use Cloudinary optimized delivery URLs with `f_auto` and `q_auto`.
- Cache site content in the browser using local in-memory cache for 2 minutes.
- Avoid polling or high-frequency refresh loops on the client.

## Monitoring

- Track failed content fetches in browser console and toast notifications.
- Use Supabase dashboard usage metrics for database reads/writes.
- Monitor Cloudflare Pages build metrics and bandwidth usage.
