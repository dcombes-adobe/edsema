/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-campaign
 * Base block: cards
 * Source: https://www.nottingham.ac.uk/
 * Generated: 2026-05-19
 *
 * Source structure:
 * .homepage-campaign-tiles > .container > .row.g-4 > .tile-container.col-lg
 *   > .campaign-tile.h-100
 *     > h2.campaign-tile-title
 *     > p.campaign-tile-text
 *     > .campaign-tile-links > a.inline-link
 *
 * Target: One row per card tile, each row contains [heading + description + link]
 */
export default function parse(element, { document }) {
  // Select all campaign tile containers
  const tiles = element.querySelectorAll('.campaign-tile, .tile-container > div[class*="tile"]');

  const cells = [];

  tiles.forEach((tile) => {
    // Extract heading (h2 with campaign-tile-title class, fallback to any h2/h3)
    const heading = tile.querySelector('h2.campaign-tile-title, h2, h3, [class*="tile-title"]');

    // Extract description paragraph
    const description = tile.querySelector('p.campaign-tile-text, p, [class*="tile-text"]');

    // Extract CTA link
    const link = tile.querySelector('.campaign-tile-links a, a.inline-link, a');

    // Build a single cell containing all card content (heading + description + link)
    const cellContent = document.createElement('div');
    if (heading) cellContent.appendChild(heading);
    if (description) cellContent.appendChild(description);
    if (link) cellContent.appendChild(link);

    if (cellContent.childNodes.length > 0) {
      cells.push([cellContent]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-campaign', cells });
  element.replaceWith(block);
}
