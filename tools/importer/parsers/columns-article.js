/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-article
 * Base: columns | Source: https://wknd-trendsetters.site
 * Extracts two-column layout with image and article metadata
 * (breadcrumbs, heading, author name, date/read time).
 * Generated: 2026-03-24
 */
export default function parse(element, { document }) {
  // Get the two column children of the grid layout
  // (from captured DOM: .grid-layout > div children)
  const gridChildren = element.querySelectorAll(':scope > div');
  const firstCol = gridChildren[0];
  const secondCol = gridChildren[1];

  // Column 1: image (from captured DOM: img.cover-image.utility-aspect-3x2)
  const col1 = [];
  if (firstCol) {
    const image = firstCol.querySelector('img.cover-image, img');
    if (image) col1.push(image);
  }

  // Column 2: breadcrumbs, heading, author info, date
  const col2 = [];
  if (secondCol) {
    // Push all children of the second column to preserve full content
    Array.from(secondCol.children).forEach((child) => col2.push(child));
  }

  // Build cells matching columns block library structure: one row with 2 columns
  const cells = [[col1, col2]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-article', cells });
  element.replaceWith(block);
}
