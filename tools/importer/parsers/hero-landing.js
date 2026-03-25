/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero-landing
 * Base: hero | Source: https://wknd-trendsetters.site
 * Extracts hero with heading, subheading, CTA buttons, and image grid.
 * Generated: 2026-03-24
 */
export default function parse(element, { document }) {
  // Extract images from the grid (from captured DOM: .grid-layout.grid-gap-xs img.cover-image)
  const images = Array.from(
    element.querySelectorAll('.grid-layout.grid-gap-xs img.cover-image, .grid-layout.grid-gap-xs img')
  );

  // Extract text content
  // Heading (from captured DOM: h1.h1-heading)
  const heading = element.querySelector('h1, .h1-heading');
  // Subheading (from captured DOM: p.subheading)
  const subheading = element.querySelector('p.subheading, .subheading');
  // CTA links (from captured DOM: .button-group a.button)
  const ctaLinks = Array.from(element.querySelectorAll('.button-group a.button, .button-group a'));

  // Build cells matching hero block library structure:
  // Row 1: images (visual content)
  // Row 2: heading + subheading + CTAs
  const cells = [];

  // Row 1: images
  if (images.length > 0) {
    cells.push(images);
  }

  // Row 2: text content
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  contentCell.push(...ctaLinks);
  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-landing', cells });
  element.replaceWith(block);
}
