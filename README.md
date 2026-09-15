# Let’s Get It Cleaned — website

A fast, static, SEO-friendly one-page site for a residential cleaning business.
No build step, no framework: plain HTML, CSS and a little vanilla JavaScript, so it
can be dropped on any host (Netlify, Vercel, GitHub Pages, Cloudflare Pages, or plain
shared hosting).

## What’s here

```
index.html          Landing page (hero, services, process, checklist,
                    reviews, quote form, FAQ, footer)
404.html            Branded not-found page
css/styles.css      All styles — design tokens live in :root at the top
js/main.js          Mobile nav, scroll reveals, form validation, footer year
assets/
  logo-mark.svg     New badge logo (sparkle emblem) — use for avatars/favicons
  logo-full.svg     Logo + wordmark lockup — use on invoices, letterheads, footer
  hero-art.svg      Cleaning-supplies illustration used in the hero and 404 page
  favicon.svg       Favicon
  apple-touch-icon.png
  og-image.png      1200×630 social share card
robots.txt
sitemap.xml
site.webmanifest
```

## Before you deploy — replace these placeholders

Search the project for each value and swap in the real one:

| Placeholder | Where it appears |
| --- | --- |
| `(555) 123-4567` / `+15551234567` | `index.html` (header, hero, services, quote, CTA, footer, floating button), `404.html`, `js/main.js`, `assets/og-image.png` |
| `hello@letsgetitcleaned.com` | `index.html`, `js/main.js` |
| `https://letsgetitcleaned.com` | `index.html` (canonical + Open Graph + JSON-LD), `robots.txt`, `sitemap.xml` |
| `Your City`, `ST`, `00000`, `Neighboring City` | `index.html` — JSON-LD `address` / `areaServed`, footer address block |
| Instagram / Facebook URLs | `index.html` footer + JSON-LD `sameAs` |
| Review quotes & names | `index.html` `#reviews` section |
| Hours (`Mon–Sat, 8am – 6pm`) | `index.html` quote section, footer, JSON-LD `openingHoursSpecification` |

Quick way to do the phone swap:

```bash
grep -rl '555' --include='*.html' --include='*.js' . \
  | xargs sed -i 's/(555) 123-4567/(YOUR) NUM-BER/g; s/+15551234567/+1YOURNUMBER/g'
```

After changing the phone number, re-generate `assets/og-image.png` (it has the
number printed on it) or just remove the number from that card.

## SEO checklist (already done)

- Unique `<title>` + meta description written around "house cleaning" intent
- Canonical URL, `robots` meta, Open Graph + Twitter card with a 1200×630 image
- **JSON-LD structured data**: `HouseCleaningService` (name, phone, hours, area
  served, service catalog) and `FAQPage` — these power Google’s rich results and
  local pack listings
- Semantic landmarks (`header`/`main`/`section`/`footer`), one `h1`, ordered headings
- Descriptive `alt` text, skip link, visible focus rings, `prefers-reduced-motion`
- `robots.txt` + `sitemap.xml`
- No render-blocking JS, SVG artwork (tiny + sharp on any screen), fonts preconnected

Still to do once the business details are real:
1. Create/claim the **Google Business Profile** — it matters more than anything on
   this page for local ranking. Keep name, address and phone identical to the footer.
2. Update `sitemap.xml` `<lastmod>` when the page changes.
3. Add real photos of finished work (before/after) — great for engagement and images search.

## The quote form

The form is marked up for **Netlify Forms** (`data-netlify="true"` + honeypot). If you
deploy to Netlify, submissions show up in the dashboard automatically.

Anywhere else, `js/main.js` falls back to opening the visitor’s email app with the
answers pre-filled, so nothing is lost. To wire up a real backend (Formspree, Basin,
Google Forms, etc.), point the form’s `action` at the endpoint and add
`data-backend-ready="true"` to the `<form>` tag to disable the mailto fallback.

## Local preview

```bash
npx http-server . -p 8080
# then open http://localhost:8080
```

## Deploying

- **Netlify / Cloudflare Pages / Vercel**: drag the folder in, or connect the repo.
  No build command, publish directory = repository root.
- **GitHub Pages**: Settings → Pages → deploy from branch, root folder.
