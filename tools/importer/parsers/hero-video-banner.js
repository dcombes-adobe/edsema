/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-video-banner
 * Base block: hero
 * Source: https://personal.nedbank.co.za/
 * Selector: #NBD_VIDEOBANNER_1
 * Generated: 2026-07-08
 *
 * Structure (single-column hero):
 *   Row 1: background image (picture in div:first-child — required by decorate())
 *   Row 2: content cell → H1 heading, primary CTA, secondary subheading (h3) + paragraph panel
 */
export default function parse(element, { document }) {
  // Background image (rendered absolute behind content)
  const bgImage = element.querySelector('.nbd-vbanner-bg-img img, picture img, img');

  // Primary heading
  const heading = element.querySelector('.nbd-vbanner-overlay h1, header h1, h1');

  // Primary CTA ("Apply now")
  const primaryCta = element.querySelector('.nbd-vbanner-buttons a, a.nbd-banner-btn, a.nbd-btn-primary');

  // Secondary supporting text panel (subheading + paragraph)
  const subheading = element.querySelector('.nbd-vbanner-overlay2 h3, .nbd-vbanner-textblock h3, h3');
  const paragraph = element.querySelector('.nbd-vbanner-overlay2 p, .nbd-vbanner-textblock p');

  // Empty-block guard
  if (!heading && !paragraph && !bgImage) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Row 1: background image (must be first child for decorate() image detection)
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: single content cell holding heading, CTA, subheading and paragraph
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (primaryCta) contentCell.push(primaryCta);
  if (subheading) contentCell.push(subheading);
  if (paragraph) contentCell.push(paragraph);
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-video-banner', cells });
  element.replaceWith(block);
}
