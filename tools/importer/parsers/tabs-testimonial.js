/* eslint-disable */
/* global WebImporter */

/**
 * Parser: tabs-testimonial
 * Base: tabs | Source: https://wknd-trendsetters.site
 * Extracts tabbed testimonials with person image, name, role, and quote.
 * Generated: 2026-03-24
 */
export default function parse(element, { document }) {
  // Extract tab panes (from captured DOM: .tab-pane)
  const tabPanes = element.querySelectorAll('.tab-pane');
  // Extract tab buttons for labels (from captured DOM: button.tab-menu-link)
  const tabButtons = element.querySelectorAll('button.tab-menu-link, .tab-menu-link');

  const cells = [];

  tabPanes.forEach((pane, index) => {
    // Tab label: person name from button
    // (from captured DOM: .tab-menu-link strong)
    let label = `Tab ${index + 1}`;
    if (tabButtons[index]) {
      const nameEl = tabButtons[index].querySelector('strong');
      if (nameEl) label = nameEl.textContent.trim();
    }

    // Tab content: image, name, role, quote from pane
    const contentCell = [];

    // Get the grid layout inside the pane
    // (from captured DOM: .grid-layout.tablet-1-column.grid-gap-md)
    const gridLayout = pane.querySelector('.grid-layout');
    if (gridLayout) {
      const gridCols = gridLayout.querySelectorAll(':scope > div');

      // First column: testimonial image (from captured DOM: img.cover-image)
      if (gridCols[0]) {
        const img = gridCols[0].querySelector('img');
        if (img) contentCell.push(img);
      }

      // Second column: name, role, quote
      if (gridCols[1]) {
        Array.from(gridCols[1].children).forEach((child) => contentCell.push(child));
      }
    }

    cells.push([label, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'tabs-testimonial', cells });
  element.replaceWith(block);
}
