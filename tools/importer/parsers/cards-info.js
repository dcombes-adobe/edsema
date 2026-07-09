/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-info.
 * Base block: cards
 * Source: #NBD_ELIGIBILITYNEEDS_1 .eligibility .qualify-list
 * Generated: 2026-07-09
 *
 * "Things you need to know" info cards. Each card is an icon plus a short
 * paragraph of text (no title).
 *
 * Structure (from blocks/cards-info/cards-info.js):
 *   - One row per card.
 *   - Each row is 2 columns: [icon/image cell, body (text) cell].
 *   - decorate() classifies a child div whose only child is a picture as the
 *     card image; the other becomes the card body.
 *   The section heading (h2.eligibility__title) is default content handled by
 *     the section, not this block, so it is excluded.
 */
export default function parse(element, { document }) {
  // INPUT EXTRACTION — validated against cached source.html
  // Cards: <div class="card nb-card"> ... <img class="card-icon"> ...
  //        <p class="card-text">text</p>
  const cards = Array.from(element.querySelectorAll('.card.nb-card, .card'));

  if (!cards.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  cards.forEach((card) => {
    // Icon: prefer the explicit card-icon image, fall back to any picture/img.
    const icon = card.querySelector('img.card-icon')
      || card.querySelector('picture, img');

    // Body text: the card-text paragraph (or any paragraph as fallback).
    const text = card.querySelector('p.card-text')
      || card.querySelector('p');

    const iconCell = icon || '';
    const bodyCell = text || '';
    cells.push([iconCell, bodyCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-info', cells });
  element.replaceWith(block);
}
