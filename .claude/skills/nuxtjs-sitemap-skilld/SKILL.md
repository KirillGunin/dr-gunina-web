---
name: nuxtjs-sitemap-skilld
description: "ALWAYS use when writing code importing \"@nuxtjs/sitemap\". Consult for debugging, best practices, or modifying @nuxtjs/sitemap, nuxtjs/sitemap, nuxtjs sitemap, sitemap."
metadata:
  version: 8.2.2
  generated_by: Anthropic · Haiku 4.5
  generated_at: 2026-07-06
---

# nuxt-modules/sitemap `@nuxtjs/sitemap@8.2.2`
**Tags:** latest: 8.2.2

**References:** [package.json](./.skilld/pkg/package.json) • [README](./.skilld/pkg/README.md) • [Docs](./.skilld/docs/_INDEX.md)

## Search

Use `skilld search "query" -p @nuxtjs/sitemap` instead of grepping `.skilld/` directories. Run `skilld search --guide -p @nuxtjs/sitemap` for full syntax, filters, and operators.

<!-- skilld:api-changes -->
## API Changes

This section documents version-specific API changes in @nuxtjs/sitemap v8.2.2.

### v8.x Changes

- DEPRECATED: `asSitemapCollection()` — composable from `@nuxtjs/sitemap/content` deprecated in v8, replaced by `defineSitemapSchema()`. Old API still logs deprecation warning but continues to work [source](./.skilld/docs/content/5.releases/3.v8.md:L21:46)

- NEW: `defineSitemapSchema()` — new composable for Nuxt Content v3 providing cleaner integration, supports `filter`, `onUrl`, and `name` options, replacing `asSitemapCollection()` [source](./.skilld/docs/content/5.releases/3.v8.md:L50:75)

- NEW: `definePageMeta` sitemap configuration — configure sitemap options directly in page components with `sitemap: { changefreq, priority }` properties [source](./.skilld/docs/content/5.releases/3.v8.md:L77:90)

- NEW: `/__sitemap__/debug-production.json` endpoint — new development-only endpoint for inspecting production sitemap output during development [source](./.skilld/docs/content/5.releases/3.v8.md:L96:98)

- NEW: i18n multi-sitemap custom expansion — custom sitemaps with `includeAppSources: true` now automatically expand per locale as `{locale}-{name}` formatted sitemaps [source](./.skilld/docs/content/5.releases/3.v8.md:L92:94)

### v7.x Breaking Changes (v6 → v7 migration)

- BREAKING: `inferStaticPagesAsRoutes` config removed — use `excludeAppSources: ['nuxt:pages', 'nuxt:route-rules', 'nuxt:prerender']` instead for equivalent functionality [source](./.skilld/docs/content/5.releases/4.v7.md:L21:32)

- BREAKING: `dynamicUrlsApiEndpoint` config removed — use `sources: ['/__sitemap/urls']` configuration instead, supports multiple endpoints and custom fetch options [source](./.skilld/docs/content/5.releases/4.v7.md:L34:45)

- BREAKING: `cacheTtl` config removed — replaced with `cacheMaxAgeSeconds` for clearer semantics and value interpretation [source](./.skilld/docs/content/5.releases/4.v7.md:L47:58)

- BREAKING: `index` route rule removed — use `robots: false` instead in route rules and Nuxt Content front matter to exclude pages from sitemaps [source](./.skilld/docs/content/5.releases/4.v7.md:L60:72)

**Also changed:** Site Config v4 dependency (internal) · Nitro hooks API stable v8 (`sitemap:input`, `sitemap:resolved`, `sitemap:index-resolved`, `sitemap:output`, `sitemap:sources`) · Nuxt hook `sitemap:prerender:done` stable v8 · `includeAppSources` config expanded per locale in v8 with i18n
<!-- /skilld:api-changes -->

<!-- skilld:best-practices -->
## Best Practices

- Avoid `autoLastmod: true` — Google will stop trusting `lastmod` dates if they change without significant content updates. Only set `lastmod` when content actually changes, not on every build [source](./.skilld/docs/content/1.guides/6.best-practices.md#set-appropriate-lastmod)

- Skip `changefreq` and `priority` fields — search engines ignore these; use `lastmod` instead to signal update frequency and control crawl budgets [source](./.skilld/docs/content/1.guides/6.best-practices.md#you-probably-don-t-need-changefreq-or-priority)

- Enable `zeroRuntime` for static sites — generates sitemaps at build time and removes ~50KB from server bundle when content only changes on deploy, eliminating all runtime generation overhead [source](./.skilld/docs/content/1.guides/8.zero-runtime.md#benchmarks)

- Use `defineCachedEventHandler()` for API endpoints in sitemap sources — prevents every cache miss from re-hitting your backend, critical for preventing thundering herd at scale [source](./.skilld/docs/content/2.advanced/2.performance.md#very-large-sites-100k-urls)

- Set generous `defaultSitemapsChunkSize` values (5000–50000) for large sites — default 1000 generates 50× unnecessary chunks compared to the search engine limit of 50,000 URLs per file [source](./.skilld/docs/content/2.advanced/2.performance.md#very-large-sites-100k-urls)

- Pre-declare `chunkCount` to skip index fetch on cold start — for very large datasets, the sitemap index normally fetches sources to count chunks; pre-declaring count eliminates this bottleneck [source](./.skilld/docs/content/2.advanced/3.chunking-sources.md#skipping-the-index-source-fetch-chunkcount)

- Use `_i18nTransform: true` for automatic locale URL generation — eliminates manually specifying each locale variant when integrated with `@nuxtjs/i18n` [source](./.skilld/docs/content/1.guides/3.i18n.md#1-i18ntransform---automatic-locale-transformation)

- Route URLs to specific sitemaps with `_sitemap` key — when using global sources with multi-sitemap setup, assign URLs to named sitemaps without re-filtering all sources [source](./.skilld/docs/content/1.guides/2.multi-sitemaps.md#using-the-_sitemap-key)

- Split existing app sources with `includeAppSources` filters — instead of duplicating sources, extend app sources and apply `include`/`exclude` glob patterns per-sitemap [source](./.skilld/docs/content/1.guides/2.multi-sitemaps.md#extending-app-sources)

- Use `defineSitemapSchema()` with `filter()` for Nuxt Content v3 — exclude draft posts and future-dated content at runtime without filesystem scanning [source](./.skilld/docs/content/1.guides/4.content.md#filtering-content)

- Load `@nuxtjs/sitemap` before `@nuxt/content` in modules array — required for Nuxt Content v3 integration to function; reverse order causes collection schema to fail [source](./.skilld/docs/content/1.guides/4.content.md#l144:153)

- Mark pre-encoded URLs with `_encoded: true` — prevents double-encoding when APIs return already-percent-encoded paths [source](./.skilld/docs/content/1.guides/0.dynamic-urls.md#handling-pre-encoded-urls)

- Configure per-page sitemap metadata with `definePageMeta()` — set `changefreq`, `priority`, or exclude pages directly in components; extracted at build time with zero runtime cost [source](./.skilld/docs/content/2.advanced/0.loc-data.md#modify-loc-data-with-page-meta)
<!-- /skilld:best-practices -->
