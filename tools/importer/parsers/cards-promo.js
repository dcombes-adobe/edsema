/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-promo
 * Base block: cards
 * Source: https://personal.nedbank.co.za/
 * Selector: #NBD_PROMOTIONCARDS_1
 * Generated: 2026-07-08
 *
 * Structure (cards — 2 columns per row, one row per card):
 *   Cell 1: promo image
 *   Cell 2: card body → title (h4), description (p), "Find out more" CTA
 */
export default function parse(element, { document }) {
  const cards = Array.from(element.querySelectorAll('.nbd-promoc-card, .card'));

  // Empty-block guard
  if (!cards.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  cards.forEach((card) => {
    // Promo image
    const image = card.querySelector('.nbd-promoc-img, .card-img-top, img');

    // Title
    const title = card.querySelector('.card-title, .card-body h4, h4, h3');

    // Description — first paragraph with actual text (skip empty filler paragraphs)
    const description = Array.from(card.querySelectorAll('.card-body p, .nbd-promoc-body p, p'))
      .find((p) => p.textContent.trim().length > 0);

    // "Find out more" CTA
    const cta = card.querySelector('.card-footer a, a.stretched-link, a[href]');

    // Image cell (single element → image column)
    const imageCell = [];
    if (image) imageCell.push(image);

    // Body cell
    const bodyCell = [];
    if (title) bodyCell.push(title);
    if (description) bodyCell.push(description);
    if (cta) bodyCell.push(cta);

    cells.push([imageCell, bodyCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-promo', cells });
  element.replaceWith(block);
}
