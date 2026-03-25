/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-faq
 * Base: columns | Source: https://wknd-trendsetters.site
 * Extracts two-column layout with heading/subheading and FAQ accordion items.
 * Generated: 2026-03-24
 */
export default function parse(element, { document }) {
  // Guard: only parse if element contains FAQ items (from captured DOM: .faq-list, details.faq-item)
  const faqList = element.querySelector('.faq-list, details.faq-item');
  if (!faqList) return;

  // Get the two column children of the grid layout
  // (from captured DOM: .grid-layout.grid-gap-xxl > div children)
  const gridChildren = element.querySelectorAll(':scope > div');
  const firstCol = gridChildren[0];
  const secondCol = gridChildren[1];

  // Column 1: heading and subheading
  // (from captured DOM: h2.h2-heading, p.subheading)
  const col1 = [];
  if (firstCol) {
    Array.from(firstCol.children).forEach((child) => col1.push(child));
  }

  // Column 2: FAQ items
  // (from captured DOM: .faq-list > details.faq-item)
  const col2 = [];
  if (secondCol) {
    const faqItems = secondCol.querySelectorAll('details.faq-item, details');
    if (faqItems.length > 0) {
      faqItems.forEach((item) => col2.push(item));
    } else {
      // Fallback: push all children
      Array.from(secondCol.children).forEach((child) => col2.push(child));
    }
  }

  // Build cells matching columns block library structure: one row with 2 columns
  const cells = [[col1, col2]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-faq', cells });
  element.replaceWith(block);
}
