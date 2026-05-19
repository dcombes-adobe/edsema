/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-stats
 * Base block: cards
 * Source: https://www.nottingham.ac.uk/
 * Generated: 2026-05-19
 *
 * Extracts ranking tiles from .homepage-rankings section.
 * Each tile contains a ranking number/text, description, and citation link.
 * Produces one row per ranking tile: [heading with ranking number, description, citation link]
 */
export default function parse(element, { document }) {
  // Find all ranking tiles within the element
  const tiles = element.querySelectorAll('.ranking-tile');

  const cells = [];

  tiles.forEach((tile) => {
    // Extract ranking number/text from .ranking-title > span
    const rankingSpan = tile.querySelector('.ranking-title span');

    // Extract description from .ranking-text p strong
    const descriptionStrong = tile.querySelector('.ranking-text p strong');

    // Extract citation link from .ranking-text p a
    const citationLink = tile.querySelector('.ranking-text a');

    // Build cell content for this tile
    const cellContent = [];

    // Ranking number as a heading (h3)
    if (rankingSpan) {
      const heading = document.createElement('h3');
      heading.textContent = rankingSpan.textContent.trim();
      cellContent.push(heading);
    }

    // Description text as a paragraph
    if (descriptionStrong) {
      const desc = document.createElement('p');
      desc.textContent = descriptionStrong.textContent.trim();
      cellContent.push(desc);
    }

    // Citation link preserved as-is
    if (citationLink) {
      const link = document.createElement('a');
      link.href = citationLink.href;
      link.textContent = citationLink.textContent.trim();
      if (citationLink.title) {
        link.title = citationLink.title;
      }
      cellContent.push(link);
    }

    // Each tile is one row with a single cell containing all content
    if (cellContent.length > 0) {
      cells.push(cellContent);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-stats', cells });
  element.replaceWith(block);
}
