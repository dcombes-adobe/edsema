/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-image-cta
 * Base block: cards
 * Source: https://www.nottingham.ac.uk/
 * Generated: 2026-05-19
 *
 * Source structure:
 * .homepage-image-cta-row > .container > .row.g-4 > .col-md-6.col-lg
 *   Each card: .imageWhiteCTA-card
 *     - img.background-image (card background image with src and alt)
 *     - a.stripe-white-cta (overlay link text)
 *
 * Target: One row per card with [image, link]
 */
export default function parse(element, { document }) {
  // Find all card containers
  const cards = element.querySelectorAll('.imageWhiteCTA-card');

  const cells = [];

  cards.forEach((card) => {
    // Extract background image
    const img = card.querySelector('img.background-image');

    // Extract CTA link
    const link = card.querySelector('a.stripe-white-cta');

    // Build row: [image, link]
    const imageCell = [];
    if (img) {
      const newImg = document.createElement('img');
      newImg.src = img.src;
      newImg.alt = img.alt || '';
      imageCell.push(newImg);
    }

    const linkCell = [];
    if (link) {
      const newLink = document.createElement('a');
      newLink.href = link.href;
      newLink.textContent = link.textContent.trim();
      if (link.title) newLink.title = link.title;
      linkCell.push(newLink);
    }

    cells.push([imageCell, linkCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-image-cta', cells });
  element.replaceWith(block);
}
