# AGENTS.md

## Project Context

This is the source code for the Revenge Hardcore Minecraft server website — a plain
React + Vite + Tailwind CSS single-page app, with a couple of small serverless
functions in `api/` (used as secure proxies for third-party APIs). It is user-owned
application code with no dependency on any third-party app-builder platform or SDK.

## Key Files

- `src/`: frontend application source.
- `src/lib/serverConfig.js`: central config — server info, branding, social links,
  news/events/staff data, feature flags. Most customization happens here.
- `src/hooks/`: data-fetching hooks (server status, top voters, Discord stats), all
  using a shared background poller (`src/lib/pollingCache.js`) so data isn't
  re-fetched on every page view.
- `api/`: Vercel-style serverless functions used as secure proxies (keeps API keys
  server-side, enables CDN caching). See DOCS.md for setup per endpoint.
- `.env` (local-only, git-ignored): secrets such as `MINECRAFT_MP_API_KEY`. Never
  commit this file or put real secrets in `.env.example`.

## Working Notes

- `npm run dev` starts the Vite frontend only — it does NOT run the functions in
  `api/`. To test those locally, use `vercel dev` (if targeting Vercel) or your
  hosting platform's equivalent local dev command.
- Run `npm run lint` and `npm run build` before finishing code changes.
- See `DOCS.md` and `CUSTOMIZE.md` for detailed guides on customizing content,
  branding, and live-data integrations.
