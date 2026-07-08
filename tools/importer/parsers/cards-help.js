/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-help
 * Base block: cards
 * Source: https://personal.nedbank.co.za/
 * Selector: #NBD_SWITCHCARD_1
 * Generated: 2026-07-08
 *
 * Structure (cards — 2 columns per row, one row per card):
 *   Help cards: Cell 1 = icon image, Cell 2 = body (title h4, description p, arrow links)
 *   Switch panel (final row): Cell 1 = empty (no icon), Cell 2 = body (title h2, description p, CTA)
 *   The "Need help?" heading is section default content and is intentionally not part of the block table.
 */
export default function parse(element, { document }) {
  const cells = [];

  // Help cards (icon + title + description + multiple arrow links)
  const helpCards = Array.from(element.querySelectorAll('.nbd-switchcard-card'));
  helpCards.forEach((card) => {
    const icon = card.querySelector('.nbd-switchcard-img-bg img, .card-body img, img');
    const title = card.querySelector('.nbd-switchcard-card-info, .card-body h4, h4, h3');
    const description = card.querySelector('.nbd-switchcard-card-desc, .card-body p, p');
    const links = Array.from(card.querySelectorAll('.card-footer a, .nbd-switchcard-card-link, a[href]'));

    const imageCell = [];
    if (icon) imageCell.push(icon);

    const bodyCell = [];
    if (title) bodyCell.push(title);
    if (description) bodyCell.push(description);
    bodyCell.push(...links);

    cells.push([imageCell, bodyCell]);
  });

  // "Switch to Nedbank" promo panel (title + description + CTA) — no icon image
  const switchTitle = element.querySelector('.nbd-switchcard-title');
  const switchDesc = element.querySelector('.nbd-switchcard-desc');
  const switchCta = element.querySelector('.nbd-switchcard-btn a, a#rtaCTA, a.nbd-btn-secondary');

  if (switchTitle || switchDesc || switchCta) {
    const panelBody = [];
    if (switchTitle) panelBody.push(switchTitle);
    if (switchDesc) panelBody.push(switchDesc);
    if (switchCta) panelBody.push(switchCta);
    // Pad image cell with empty string to keep 2-column row structure
    cells.push(['', panelBody]);
  }

  // Empty-block guard
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-help', cells });
  element.replaceWith(block);
}
