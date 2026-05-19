/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero-banner
 * Base: hero | Source: https://www.nottingham.ac.uk/
 * Extracts hero banner with background image, heading, description, and CTA link.
 * Handles both Nottingham (.homepage-hero-banner) and WKND (.utility-position-relative) structures.
 * Selectors validated against: migration-work/block-context/hero-banner/source.html
 * Generated: 2026-05-19
 */
export default function parse(element, { document }) {
  // Extract background image
  // Nottingham: img.desktop-banner-image | WKND: img.cover-image
  const bgImage = element.querySelector(
    'img.desktop-banner-image, img.cover-image, img[class*="banner-image"]'
  );

  // Extract heading
  // Nottingham: h1.banner-title | WKND: .card-body h2.h1-heading
  const heading = element.querySelector(
    'h1.banner-title, h2.h1-heading, .banner-content h1, .card-body h2, h1, h2'
  );

  // Extract description paragraph
  // Nottingham: p.banner-text | WKND: .card-body p.subheading
  const description = element.querySelector(
    'p.banner-text, p.subheading, .banner-content p, .card-body p'
  );

  // Extract CTA link(s)
  // Nottingham: a.stripe-white-cta | WKND: .button-group a
  const ctaLinks = Array.from(
    element.querySelectorAll(
      'a.stripe-white-cta, .button-group a, .banner-content a[href], a[class*="cta"]'
    )
  );

  // Build cells matching hero block table structure:
  // Row 1: background image (single cell)
  // Row 2: heading + description + CTAs (all in one cell)
  const cells = [];

  // Row 1: background image
  if (bgImage) {
    cells.push([[bgImage]]);
  }

  // Row 2: text content combined in one cell (heading, description, CTAs)
  const contentItems = [];
  if (heading) contentItems.push(heading);
  if (description) contentItems.push(description);
  contentItems.push(...ctaLinks);
  if (contentItems.length > 0) {
    cells.push([contentItems]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
