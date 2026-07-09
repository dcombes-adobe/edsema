/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-cover.
 * Base block: cards
 * Source: https://personal.nedbank.co.za/insure/business-cover.html (#NBD_ILLUSTRATIONCARD_1)
 * Generated: 2026-07-09
 *
 * Structure (from blocks/cards-cover/cards-cover.js):
 *   - One row per cover-type card.
 *   - Each row is 2 columns: [icon image cell, body cell (title + description)].
 *   - A cell whose only child is a picture becomes the card image; the other is the body.
 *   The section heading (h3 "Insurance that works as hard as you do.") is default content, not this block.
 */
export default function parse(element, { document }) {
  // INPUT EXTRACTION — validated against cached source.html
  // Cards: <div class="columnsitem N"><div class="card nb-card">...</div></div>
  const cards = Array.from(element.querySelectorAll('.card.nb-card, .nb-card'));

  if (!cards.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  cards.forEach((card) => {
    // Icon image: .icon-wrapper img.card-icon
    const icon = card.querySelector('.icon-wrapper picture, .icon-wrapper img, img.card-icon, picture, img');

    // Title: <h4> in .card-body
    const title = card.querySelector('.card-body h4, h4, h3, [class*="title"]');

    // Description: .description p (skip the empty leading <p>)
    const description = card.querySelector('.description p, .card-body .description, .description');

    const bodyCell = [];
    if (title) bodyCell.push(title);
    if (description) bodyCell.push(description);

    cells.push([icon || '', bodyCell.length ? bodyCell : '']);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-cover', cells });
  element.replaceWith(block);
}
