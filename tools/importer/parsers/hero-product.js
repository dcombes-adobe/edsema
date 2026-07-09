/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-product.
 * Base block: hero
 * Source: https://personal.nedbank.co.za/insure/business-cover.html (#NBD_BANNER_1)
 * Generated: 2026-07-09
 *
 * Structure (from blocks/hero-product/hero-product.js + hero-product.css):
 *   - Single-column block.
 *   - Row 1: the hero photo (rendered as an absolutely-positioned background image).
 *   - Row 2: content cell holding the H1 heading, intro paragraph and the "Get a call back" CTA.
 */
export default function parse(element, { document }) {
  // INPUT EXTRACTION — selectors validated against cached source.html
  // Photo: <figure class="nbd-banner-img banner-bgimage"><img></figure>
  const image = element.querySelector('.banner-bgimage picture, .nbd-banner-img picture, figure picture, .banner-bgimage img, .nbd-banner-img img, .nbd-img-banner img, figure img');

  // Content lives in .nbd-banner-details
  const content = element.querySelector('.nbd-banner-details') || element;
  const heading = content.querySelector('h1, h2, h3, [class*="title"]');
  const intro = content.querySelector('p');
  const cta = content.querySelector('a.nbd-btn, a.btn, .nbd-banner-buttons a, a[href]');

  // Empty-block guard
  if (!heading && !intro && !image) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row 1: background photo (optional)
  if (image) cells.push([image]);

  // Row 2: content cell (heading + intro + CTA)
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (intro) contentCell.push(intro);
  if (cta) {
    // Drop the decorative arrow <i> so only the link text remains
    cta.querySelectorAll('i').forEach((i) => i.remove());
    contentCell.push(cta);
  }
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-product', cells });
  element.replaceWith(block);
}
