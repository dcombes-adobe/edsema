/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-news
 * Base block: carousel
 * Source: https://www.nottingham.ac.uk/
 * Generated: 2026-05-19
 *
 * Extracts news carousel slides from a Slick slider.
 * Skips .slick-cloned slides to avoid duplicates from infinite scroll.
 * Each row: [image | title + description + link]
 */
export default function parse(element, { document }) {
  // Select only real slides (not cloned duplicates used for infinite scroll)
  const slides = element.querySelectorAll('.slick-slide:not(.slick-cloned)');

  const cells = [];

  slides.forEach((slide) => {
    // Extract the desktop image (d-md-block variant) from the image column
    const img = slide.querySelector('.col-md-4 img.vertical-card-img.d-none.d-md-block')
      || slide.querySelector('.col-md-4 img.vertical-card-img')
      || slide.querySelector('.col-md-4 img');

    // Extract content from the card-content column
    const title = slide.querySelector('.card-content h3.news-title')
      || slide.querySelector('.card-content h3')
      || slide.querySelector('h3');

    const description = slide.querySelector('.card-content p.news-desc')
      || slide.querySelector('.card-content p')
      || slide.querySelector('p');

    const link = slide.querySelector('.card-content a.inline-link')
      || slide.querySelector('.card-content a')
      || slide.querySelector('a');

    // Build content cell: title + description + link
    const contentCell = [];
    if (title) contentCell.push(title);
    if (description) contentCell.push(description);
    if (link) contentCell.push(link);

    // Each row is [image, content]
    const imageCell = img ? [img] : [''];
    cells.push([imageCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-news', cells });
  element.replaceWith(block);
}
