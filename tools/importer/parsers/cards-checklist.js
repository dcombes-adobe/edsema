/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-checklist.
 * Base block: cards
 * Source: https://personal.nedbank.co.za/insure/business-cover.html (#NBD_WHYCHOOSE_1)
 * Generated: 2026-07-09
 *
 * Structure (from blocks/cards-checklist/cards-checklist.js):
 *   - One row per checklist item.
 *   - Each row is 2 columns: [icon/image cell, body (label) cell].
 *   - A cell whose only child is a picture becomes the card image; the other is the body.
 *   The heading/intro (h3/p/h5 in <header>) are default content handled by the section, not this block.
 */
export default function parse(element, { document }) {
  // INPUT EXTRACTION — validated against cached source.html
  // Checklist items: <ul><li>...<figure class="nbd-icon-container"><em/></figure><span><p>label</p></span></li></ul>
  const items = Array.from(element.querySelectorAll('ul > li'));

  if (!items.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  items.forEach((li) => {
    // Icon: prefer an <img>/<picture>; otherwise fall back to the icon <figure>/<em>
    const icon = li.querySelector('picture, img')
      || li.querySelector('figure.nbd-icon-container, figure, em');

    // Label: the text content (span/p)
    const label = li.querySelector('span, p')
      || li;

    const iconCell = icon || '';
    const bodyCell = label || '';
    cells.push([iconCell, bodyCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-checklist', cells });
  element.replaceWith(block);
}
