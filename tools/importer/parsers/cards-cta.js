/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-cta.
 * Base block: cards
 * Source: #NBD_ELIGIBILITYCHANNELS_1 .channel
 * Generated: 2026-07-09
 *
 * "Ways to open" CTA cards. Each card is a title plus a single link; the whole
 * card is clickable (stretched link) with a trailing arrow.
 *
 * Structure (from blocks/cards-cta/cards-cta.js + cards-cta.css):
 *   - One row per card.
 *   - Each row is 2 columns: [title cell, link cell].
 *   - decorate() makes the first link in the card the stretched clickable link.
 *   - Dark vs light is handled purely by CSS (:first-child = dark charcoal),
 *     so card ORDER is preserved (dark "Use the Money app" card first).
 *   The section heading (h2 "Ways to open") is default content handled by the
 *     section, not this block, so it is excluded.
 */
export default function parse(element, { document }) {
  // INPUT EXTRACTION — validated against cached source.html
  // Cards: <div class="card ..."> <h5 class="card-text">title</h5>
  //        <a class="stretched-link card-link" href="...">...</a>
  const cards = Array.from(element.querySelectorAll('.row.nb-row .card, .card'));

  if (!cards.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  cards.forEach((card) => {
    // Title: card-text heading, fall back to any heading/paragraph.
    const title = card.querySelector('.card-text')
      || card.querySelector('h2, h3, h4, h5, p');

    // Link: the card's stretched link; rebuild it with the title text so the
    // cell carries a usable anchor (source anchor is icon-only).
    const sourceLink = card.querySelector('a.card-link[href], a[href]');
    let linkCell = '';
    if (sourceLink) {
      const link = document.createElement('a');
      link.href = sourceLink.getAttribute('href');
      link.textContent = (title && title.textContent.trim()) || sourceLink.getAttribute('href');
      linkCell = link;
    }

    const titleCell = title || '';
    cells.push([titleCell, linkCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-cta', cells });
  element.replaceWith(block);
}
