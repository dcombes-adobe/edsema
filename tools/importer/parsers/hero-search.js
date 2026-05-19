/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-search
 * Base block: hero
 * Source: https://www.nottingham.ac.uk/
 * Selector: .search-section
 * Generated: 2026-05-19
 *
 * Extracts the course finder / search section and produces a hero-search block.
 * Since forms (inputs, selects, buttons) don't translate directly to EDS blocks,
 * the parser captures the heading and a descriptive summary of the search
 * functionality including the available study level options.
 */
export default function parse(element, { document }) {
  // Extract heading from .search-section-title or fallback to h2/h1
  const heading = element.querySelector('h2.search-section-title, h1.search-section-title, h2, h1');

  // Extract the select options to describe available study levels
  const select = element.querySelector('select#cfinder-filter, select');
  const options = select
    ? Array.from(select.querySelectorAll('option'))
      .map((opt) => opt.textContent.trim())
      .filter((text) => text && text !== 'Select study level')
    : [];

  // Extract the button text for context
  const button = element.querySelector('button#action, button.button--secondary, .search-submit button');
  const buttonText = button ? button.textContent.trim() : 'Search';

  // Extract the input label/placeholder for context
  const label = element.querySelector('label.course-finder-label, .search-keyword label');
  const labelText = label ? label.textContent.trim() : 'Search courses';

  // Build description paragraph that captures the search functionality
  const description = document.createElement('p');
  const studyLevels = options.length > 0 ? options.join(', ') : 'Undergraduate, Postgraduate, Research';
  description.textContent = `Course finder: ${labelText}. Study levels: ${studyLevels}. Action: ${buttonText}`;

  // Build cells array matching target structure:
  // Row 1: heading
  // Row 2: description of search functionality
  const cells = [];

  if (heading) {
    cells.push([heading]);
  }

  cells.push([description]);

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-search', cells });
  element.replaceWith(block);
}
