/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-feature
 * Base block: columns
 * Sources: https://www.nottingham.ac.uk/ (.homepage-image-cta-block),
 *          https://personal.nedbank.co.za/ (#NBD_CONTENTBLOCK_1)
 * Generated: 2026-05-19, updated: 2026-07-08 (Nedbank reuse)
 *
 * Structure: Two-column layout
 *   Column 1 (left): heading + description/bullet-list + CTA link
 *   Column 2 (right): image
 */
export default function parse(element, { document }) {
  // Column 1: text content (heading, description, CTA)
  // Nottingham uses .text-content; Nedbank uses .nbd-offset-content / .nbd-cobl-content-div
  const textContent = element.querySelector('.text-content, .nbd-offset-content, .nbd-cobl-content-div');
  const heading = textContent
    ? textContent.querySelector('h3, h2, h1, .nbd-cobl-heading')
    : element.querySelector('h3, h2, h1, .nbd-cobl-heading');

  // Description: prefer the bullet/rich-text paragraph with actual content
  // (Nedbank has an empty placeholder <p> before the real .cobl-rtcontent-div copy)
  const descScope = textContent || element;
  const description = Array.from(
    descScope.querySelectorAll('.cobl-rtcontent-div p, .block-content p, p'),
  ).find((p) => p.textContent.trim().length > 0);

  const ctaLink = element.querySelector('a.stripe-white-cta, a.nbd-cobl-anchor, a[class*="cta"], .block-content a, .nbd-anchor-div a');

  // Column 2: image
  const image = element.querySelector('.image-container img, .nbd-offset-imageback img, .col-lg-6:first-child img, .col-lg-6:last-child img, img');

  // Build column 1 cell content
  const col1Content = [];
  if (heading) col1Content.push(heading);
  if (description) col1Content.push(description);
  if (ctaLink) col1Content.push(ctaLink);

  // Build column 2 cell content
  const col2Content = [];
  if (image) col2Content.push(image);

  // Build cells array: single row with two columns
  const cells = [
    [col1Content, col2Content],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-feature', cells });
  element.replaceWith(block);
}
