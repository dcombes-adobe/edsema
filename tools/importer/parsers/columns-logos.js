/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-logos
 * Base block: columns
 * Source: https://www.nottingham.ac.uk/
 * Selector: .homepage-partnerships
 * Generated: 2026-05-19
 *
 * Extracts partner/affiliation logos from the desktop display container
 * and produces a single-row columns block with one cell per logo image.
 */
export default function parse(element, { document }) {
  // Target the desktop version only (.d-none.d-md-inline)
  const desktopContainer = element.querySelector('.d-none.d-md-inline');

  // Extract all partner logo images from the desktop container
  const logoImages = desktopContainer
    ? Array.from(desktopContainer.querySelectorAll('img.partner-icon'))
    : Array.from(element.querySelectorAll('.large-display-icons img.partner-icon'));

  // Build cells: single row with each logo in its own cell
  // Each cell is an array containing the image element
  const cells = [];

  if (logoImages.length > 0) {
    // Single row with all logos as separate cells
    const row = logoImages.map((img) => img);
    cells.push(row);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-logos', cells });
  element.replaceWith(block);
}
