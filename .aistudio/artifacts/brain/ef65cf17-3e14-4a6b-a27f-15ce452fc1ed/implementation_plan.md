# Group Links Search Engine Optimization (SEO) Plan

Enhance Group Links with production-grade Search Engine Optimization (SEO), rich social sharing OpenGraph & Twitter metadata, dynamic page-level meta tag generation, and Schema.org structured data (JSON-LD), without altering the existing UI design, visual theme, or website layout structure.

## User Review & Critical Decisions

> [!IMPORTANT]
> The existing visual theme, layout structure, color tokens, and navigation flows remain **100% untouched**, as explicitly requested ("dont change anythink like website structure or theme just keep as it is").

- **Confirmed Schema.org Strategy**: `WebSite` and `SearchAction` structured data schema to index the group links directory and enable sitelinks search box capability.
- **Confirmed OpenGraph Strategy**: Dynamic OpenGraph & Twitter meta tag generation (`generateMetadata`) on group detail pages (`/group/[id]`, `/category/[slug]`, `/adult-groups`) alongside clean global default metadata.

---

## 1. Overview & Core Concept

- **What It Does**: Integrates semantic HTML metadata, OpenGraph protocol cards, Twitter summary cards, dynamic title/description formatting, canonical URL tags, and Google-compliant JSON-LD structured data.
- **Target Audience**: Search engine crawlers (Googlebot, Bingbot), web crawlers, and users sharing WhatsApp, Telegram, and Discord group links on social platforms (Twitter, Slack, LinkedIn, iMessage).
- **Key Value**: Improves search engine ranking, enables search snippet rich previews, and guarantees attractive visual link previews when group links are shared across messaging and social platforms.

---

## 2. User Experience & Visual Design

- **Visual Preservation Guarantee**: Zero visual changes to the user interface, typography, colors, or page components.
- **Social Sharing Experience**: When users copy and share a URL (e.g. `grouplinks.app/group/tech-enthusiasts`), messaging platforms render a custom card with the group's title, description, badge thumbnail image, and canonical URL.
- **Search Snippet Experience**: Google search results show branded site breadcrumbs, high-CTR meta descriptions, and a integrated search action snippet.

---

## 3. Key Technical Decisions & Strategy

- **Next.js Metadata API Integration**: Utilize Next.js 15 `export const metadata` in root `app/layout.tsx` for global metadata, and `export async function generateMetadata()` in dynamic group routes (`app/group/[id]/page.tsx`, `app/category/[slug]/page.tsx`).
- **Schema.org Structured Data**: Inject `<script type="application/ld+json">` containing `WebSite` with `SearchAction` target (`/search?q={search_term_string}`), as well as `CollectionPage` / `ItemGroup` schema for category listings.
- **Sitemap & Robots.txt Alignment**: Ensure `sitemap.xml` and `robots.txt` dynamically index active public group links and categories while respecting canonical URL rules.

---

## 4. Technical Architecture & Data Strategy

```
┌─────────────────────────────────────────────────────────────────────────┐
│                           Crawlers & Social Apps                        │
│            (Googlebot, Telegram, WhatsApp, Twitter, iMessage)           │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ Requests URL / Page
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                         Next.js App Router Layer                        │
│                                                                         │
│  ┌───────────────────────┐             ┌─────────────────────────────┐  │
│  │   Root layout.tsx     │             │   Dynamic Route Pages       │  │
│  │                       │             │   /group/[id]/page.tsx      │  │
│  │ - Global metadata     │             │                             │  │
│  │ - Schema.org JSON-LD  │             │ - generateMetadata()        │  │
│  │ - Canonical tags      │             │ - Dynamic OG Image & Card   │  │
│  └───────────────────────┘             └─────────────────────────────┘  │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │ Fetches metadata payload
                                     ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       Group Links Database / API                        │
│              (Active Groups, Categories, SEO Slug Resolver)             │
└─────────────────────────────────────────────────────────────────────────┘
```

### Metadata Implementation Matrix

| Metadata Tag | Root Default (`app/layout.tsx`) | Dynamic Group Page (`generateMetadata`) |
| :--- | :--- | :--- |
| `<title>` | Group Links – Find & Share Active WhatsApp & Telegram Group Links | [Group Title] – Join WhatsApp/Telegram Group \| Group Links |
| `description` | Discover, join, and share thousands of active WhatsApp, Telegram, and Discord group links across tech, gaming, career, and education. | Join [Group Title] on [Platform]. [Group Summary Description]. Active community link. |
| `og:image` | Default site banner (`/og-image.png`) | Group category icon / custom group thumbnail |
| `twitter:card` | `summary_large_image` | `summary_large_image` |
| `canonical` | `https://grouplinks.app` | `https://grouplinks.app/group/[id]` |

---

## 5. Execution Steps

1. **Root Layout Metadata & JSON-LD**: Audit and refine `app/layout.tsx` to include structured site metadata, OpenGraph, Twitter cards, and `WebSite` + `SearchAction` JSON-LD script.
2. **Dynamic Group & Category Metadata**: Implement `generateMetadata()` in `app/group/[id]/page.tsx` and category pages to pull live group metadata for social cards.
3. **Sitemap & Robots Verification**: Validate `app/sitemap.ts` or `scripts/generate-sitemap.mjs` to ensure crawlability and indexation of all group routes.
4. **Verification**: Compile applet and test metadata tags to ensure 100% SEO compliance with zero visual regressions.
