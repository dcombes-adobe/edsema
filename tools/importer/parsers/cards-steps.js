/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-steps.
 * Base block: cards
 * Source: https://personal.nedbank.co.za/insure/business-cover.html (#NBD_APPLICATIONPROCESS_1)
 * Generated: 2026-07-09
 *
 * Structure (from blocks/cards-steps/cards-steps.js):
 *   - One row per step. decorate() renders rows as an <ol>, so step numbering is document order —
 *     the source circle-number elements are decorative and intentionally omitted.
 *   - Each row is 2 columns: [icon image cell, body cell (title + description)].
 *   - A cell whose only child is a picture becomes the card image; the other is the body.
 *   The section heading (h2 "Simple, fast claims process.") is default content, not this block.
 */
export default function parse(element, { document }) {
  // INPUT EXTRACTION — validated against cached source.html
  // Steps: <div class="row nbd-cards-wrapper"><div class="card nbd-step-card">...</div></div>
  const steps = Array.from(element.querySelectorAll('.nbd-step-card'));

  if (!steps.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];
  steps.forEach((step) => {
    // Icon: .nbd-step-card-img holds the step icon (last <img> is the meaningful glyph)
    const imgWrap = step.querySelector('.nbd-step-card-img');
    let icon = null;
    if (imgWrap) {
      const pic = imgWrap.querySelector('picture');
      const imgs = imgWrap.querySelectorAll('img');
      icon = pic || imgs[imgs.length - 1] || imgs[0] || null;
    }

    // Title: the step heading. Exclude the decorative circle-step number (.nbd-circle-step-text).
    let title = step.querySelector('.nbd-step-card-heading h5, .nbd-step-card-heading');
    if (!title) {
      title = Array.from(step.querySelectorAll('h5, h4'))
        .find((h) => !h.classList.contains('nbd-circle-step-text')
          && !h.closest('.nbd-circle-step, .nbd-mb-circle-step')) || null;
    }

    // Description: non-empty paragraphs in .nbd-step-card-content
    const descParas = Array.from(step.querySelectorAll('.nbd-step-card-content p'))
      .filter((p) => p.textContent.trim().length);

    const bodyCell = [];
    if (title) bodyCell.push(title);
    bodyCell.push(...descParas);

    cells.push([icon || '', bodyCell.length ? bodyCell : '']);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-steps', cells });
  element.replaceWith(block);
}
