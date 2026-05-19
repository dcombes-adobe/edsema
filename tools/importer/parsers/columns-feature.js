/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-feature
 * Base block: columns
 * Source: https://www.nottingham.ac.uk/
 * Selector: .homepage-image-cta-block
 * Generated: 2026-05-19
 *
 * Structure: Two-column layout
 *   Column 1 (left): heading (h3) + paragraph + CTA link
 *   Column 2 (right): image
 */
export default function parse(element, { document }) {
  // Column 1: text content (heading, description, CTA)
  const textContent = element.querySelector('.text-content');
  const heading = textContent
    ? textContent.querySelector('h3, h2, h1')
    : element.querySelector('h3, h2, h1');
  const description = textContent
    ? textContent.querySelector('p')
    : element.querySelector('.block-content p');
  const ctaLink = element.querySelector('a.stripe-white-cta, a[class*="cta"], .block-content a');

  // Column 2: image
  const image = element.querySelector('.image-container img, .col-lg-6:last-child img, img');

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
