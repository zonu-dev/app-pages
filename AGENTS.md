# AGENTS.md

Project-specific rules:

- This repo hosts user-facing static pages for ZOOCHI apps.
- Keep copy and navigation user-facing. Do not surface repository or developer workflow details in public pages.
- Public pages should stay aligned to the current locale set used by Etymo: `en`, `ja`, `ko`, `zh-Hans`, `vi`, `id`.
- When adding or changing a public page, update all locale variants together unless the task explicitly says otherwise.
- Keep language switchers, top-page links, and footer back-links consistent across locales.
- Preserve legacy `apps/*.html` redirect pages when changing public paths.
- Prefer shared styling changes in `assets/style.css` instead of duplicating per-page styles.
- For document pages, English lives at `index.html` and other locales use `index.<locale>.html`.
- For top pages, Japanese lives at `index.html`, English at `index.en.html`, and other locales use `index.<locale>.html`.
- Run a simple local preview when needed with `python3 -m http.server 4173`.
