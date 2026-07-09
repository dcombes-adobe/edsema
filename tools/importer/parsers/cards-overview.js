/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-overview
 * Base block: cards
 * Source: https://personal.nedbank.co.za/
 * Selector: #NBD_OVERVIEWCARDS_1
 * Generated: 2026-07-08
 *
 * Structure (cards — 2 columns per row, one row per card):
 *   Cell 1: icon image
 *   Cell 2: card body → title (h5), subtitle (p), arrow link (CTA)
 */
export default function parse(element, { document }) {
  const cards = Array.from(element.querySelectorAll('.nbd-vcard-card, .card'));

  // Empty-block guard
  if (!cards.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  cards.forEach((card) => {
    // Icon image — prefer the labelled icon image, fall back to any card image
    const icon = card.querySelector('.nbd-intercept-img-bg img[alt], .card-header img:last-of-type, img');

    // Body content
    const title = card.querySelector('.nbd-vcard-card-body h5, .card-body h5, h5, h4, h3');
    const subtitle = card.querySelector('.nbd-vcard-card-body p, .card-body p, p');
    const link = card.querySelector('.nbd-vcard-footer a, .card-footer a, a[href]');

    // Image cell (single element so decorate() flags it as the image column)
    const imageCell = [];
    if (icon) imageCell.push(icon);

    // Body cell
    const bodyCell = [];
    if (title) bodyCell.push(title);
    if (subtitle) bodyCell.push(subtitle);
    if (link) bodyCell.push(link);

    cells.push([imageCell, bodyCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-overview', cells });

  // Preserve the section heading (e.g. "What we can do for you") as default
  // content above the block rather than discarding it with the container.
  const heading = element.querySelector('h1, h2, h3');
  if (heading) {
    element.replaceWith(heading, block);
  } else {
    element.replaceWith(block);
  }
}
