/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-gallery
 * Base: cards | Source: https://wknd-trendsetters.site
 * Extracts image-only gallery cards (no text content per card).
 * Generated: 2026-03-24
 */
export default function parse(element, { document }) {
  // Guard: only parse if element contains image-only cards (no .article-card elements)
  if (element.querySelector('.article-card, .article-card-body')) return;

  // Extract all gallery image containers
  // (from captured DOM: .utility-aspect-1x1 containing img.cover-image)
  const imageContainers = element.querySelectorAll('.utility-aspect-1x1, :scope > div');

  const cells = [];
  imageContainers.forEach((container) => {
    const img = container.querySelector('img.cover-image, img');
    if (img) {
      // Cards block: each row has [image] for image-only gallery variant
      cells.push([img]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}
