# Single Page Migration Plan — University of Nottingham Homepage

## Objective

Migrate the homepage of **https://www.nottingham.ac.uk/** to AEM Edge Delivery Services within this project.

## Important Context

This project already has an existing migration from `https://wknd-trendsetters.site` with 7 block variants, content files, and import infrastructure. The new migration will add to this project — new block variants, parsers, and content for the Nottingham homepage.

## Migration Approach

A single-page migration follows this workflow:

1. **Site Analysis** — Analyze the page structure, identify sections and content patterns
2. **Page Analysis** — Deep-dive into the DOM, capture screenshots, identify block variants needed
3. **Block Mapping** — Map page sections to EDS blocks (reusing existing variants where possible)
4. **Import Infrastructure** — Generate parsers for new block variants and page transformers
5. **Content Import** — Run the import to produce the HTML content file
6. **Design Migration** — Extract and apply styles to match the original site's visual design
7. **Validation** — Preview and compare against the original

## Checklist

- [ ] Analyze https://www.nottingham.ac.uk/ page structure (sections, blocks, content patterns)
- [ ] Capture page screenshots and clean HTML
- [ ] Identify block variants needed (check for reuse of existing variants)
- [ ] Create new block variant code (JS + CSS) for each unique variant
- [ ] Map blocks to page sections in page-templates.json
- [ ] Generate import parsers for new block variants
- [ ] Generate page transformers (cleanup + sections)
- [ ] Run content import to produce HTML
- [ ] Migrate design system (typography, colors, spacing)
- [ ] Apply block-level styling to match original
- [ ] Preview and validate against original site

## Risks & Considerations

- The Nottingham site likely uses complex navigation, mega-menus, and university-specific patterns
- Some blocks may differ significantly from the existing WKND Trendsetters variants
- Image-heavy hero sections and card grids are expected and well-supported
- Cookie consent banners and other overlays should be excluded from migration

---

*To begin this migration, switch to Execute mode. The site migration skill will orchestrate the full workflow.*
