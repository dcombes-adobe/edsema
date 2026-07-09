/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-article
 * Base: columns
 * Sources:
 *   - https://wknd-trendsetters.site (grid layout: two > div columns)
 *   - Nedbank blog article hero banner (.nbd-article-banner-bg-img:
 *     background <img> + .overlay content with title/author/date/intro)
 *
 * Extracts a two-column layout: column 1 = image, column 2 = article
 * metadata (breadcrumbs, heading, author name, date/read time, intro).
 * Generated: 2026-03-24
 */
export default function parse(element, { document }) {
  // WKND layout: the grid has two direct > div column children.
  const gridChildren = element.querySelectorAll(':scope > div');
  const firstCol = gridChildren[0];
  const secondCol = gridChildren[1];

  const col1 = [];
  const col2 = [];

  // Nedbank banner: a background <img> as a direct child plus an .overlay
  // wrapper holding the article details. Detect this shape by the direct-child
  // image + overlay content container.
  const nbdImage = element.querySelector(':scope > img');
  const nbdOverlay = element.querySelector(':scope > .overlay, .nbd-article-banner-details');

  if (nbdImage || nbdOverlay) {
    // Column 1: background image.
    if (nbdImage) {
      col1.push(nbdImage);
    } else {
      const img = element.querySelector('img');
      if (img) col1.push(img);
    }

    // Column 2: title + any author/date/intro details from the overlay.
    const details = element.querySelector('.nbd-article-banner-details') || nbdOverlay || element;
    const heading = details.querySelector('h1, h2, [class*="banner-title"]');
    if (heading) col2.push(heading);
    // Author / date / intro paragraphs, if present.
    details
      .querySelectorAll('[class*="author"], [class*="date"], [class*="byline"], p')
      .forEach((el) => {
        if (!col2.includes(el)) col2.push(el);
      });
  } else {
    // WKND / grid-layout shape.
    // Column 1: image (from captured DOM: img.cover-image.utility-aspect-3x2).
    if (firstCol) {
      const image = firstCol.querySelector('img.cover-image, img');
      if (image) col1.push(image);
    }

    // Column 2: breadcrumbs, heading, author info, date.
    if (secondCol) {
      // Push all children of the second column to preserve full content.
      Array.from(secondCol.children).forEach((child) => col2.push(child));
    }
  }

  // Build cells matching columns block library structure: one row with 2 columns.
  const cells = [[col1, col2]];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-article', cells });
  element.replaceWith(block);
}
