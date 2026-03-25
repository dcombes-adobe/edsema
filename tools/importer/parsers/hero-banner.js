/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero-banner
 * Base: hero | Source: https://wknd-trendsetters.site
 * Extracts CTA banner with background image, heading, text, and CTA button.
 * Generated: 2026-03-24
 */
export default function parse(element, { document }) {
  // Extract background image (from captured DOM: img.cover-image.utility-overlay)
  const bgImage = element.querySelector('img.cover-image.utility-overlay, img.cover-image');

  // Extract text content from card body (from captured DOM: .card-body)
  const cardBody = element.querySelector('.card-body');

  // Heading (from captured DOM: .card-body h2.h1-heading)
  const heading = cardBody
    ? cardBody.querySelector('h2, .h1-heading')
    : element.querySelector('h2, .h1-heading');

  // Description (from captured DOM: .card-body p.subheading)
  const description = cardBody
    ? cardBody.querySelector('p.subheading, p')
    : element.querySelector('p.subheading, p');

  // CTA links (from captured DOM: .card-body .button-group a)
  const ctaLinks = Array.from(
    cardBody
      ? cardBody.querySelectorAll('.button-group a')
      : element.querySelectorAll('.button-group a')
  );

  // Build cells matching hero block library structure:
  // Row 1: background image
  // Row 2: heading + description + CTAs
  const cells = [];

  // Row 1: background image
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: text content
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);
  contentCell.push(...ctaLinks);
  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-banner', cells });
  element.replaceWith(block);
}
