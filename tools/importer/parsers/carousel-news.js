/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-news
 * Base block: carousel
 * Sources:
 *   - https://www.nottingham.ac.uk/ (Slick slider, .slick-slide)
 *   - Nedbank blog article related-posts (Swiper slider, .swiper-slide)
 *
 * Extracts news carousel slides. Skips cloned/duplicate slides to avoid
 * duplicates from infinite scroll.
 * Each row: [image | title + description + link]
 */
export default function parse(element, { document }) {
  // Detect Nottingham Slick slides vs Nedbank Swiper slides.
  // Select only real slides (not cloned duplicates used for infinite scroll).
  let slides = element.querySelectorAll('.slick-slide:not(.slick-cloned)');

  // Nedbank: Swiper slider — skip duplicate clones Swiper adds for looping.
  if (!slides.length) {
    slides = element.querySelectorAll(
      '.swiper-slide:not(.swiper-slide-duplicate):not(.swiper-slide-duplicate-active):not(.swiper-slide-duplicate-next):not(.swiper-slide-duplicate-prev)',
    );
  }

  const cells = [];

  slides.forEach((slide) => {
    // Nedbank slides contain two card variants: a no-image list card
    // (.nbd-article-post-card) and an image card (.nbd-article-card).
    // Prefer the image card as the source of the thumbnail.

    // Extract the image.
    // Nottingham: desktop image in .col-md-4; Nedbank: .nbd-article-card-img img.
    const img = slide.querySelector('.col-md-4 img.vertical-card-img.d-none.d-md-block')
      || slide.querySelector('.col-md-4 img.vertical-card-img')
      || slide.querySelector('.col-md-4 img')
      || slide.querySelector('.nbd-article-card-img img')
      || slide.querySelector('.card-header img')
      || slide.querySelector('img');

    // Extract title.
    // Nottingham: .card-content h3.news-title; Nedbank: .nbd-article-card-heading h4.
    const title = slide.querySelector('.card-content h3.news-title')
      || slide.querySelector('.card-content h3')
      || slide.querySelector('.nbd-article-card-heading h4')
      || slide.querySelector('.nbd-article-post-card-heading h4')
      || slide.querySelector('h3, h4');

    // Extract description.
    // Nottingham: .card-content p.news-desc; Nedbank: .nbd-article-card-content p.
    const description = slide.querySelector('.card-content p.news-desc')
      || slide.querySelector('.card-content p')
      || slide.querySelector('.nbd-article-card-content p')
      || slide.querySelector('.nbd-article-post-card-content p')
      || slide.querySelector('p');

    // Extract link.
    // Nottingham: .card-content a.inline-link; Nedbank: the "Read" link with text
    // (.articlelink) — avoid the empty .stretched-link overlay anchors.
    const link = slide.querySelector('.card-content a.inline-link')
      || slide.querySelector('.card-content a')
      || slide.querySelector('.nbd-article-card-Link a.articlelink')
      || slide.querySelector('.nbd-article-post-card-Link a.articlelink')
      || slide.querySelector('a.articlelink')
      || slide.querySelector('a[href]');

    // Build content cell: title + description + link
    const contentCell = [];
    if (title) contentCell.push(title);
    if (description) contentCell.push(description);
    if (link) contentCell.push(link);

    // Skip empty slides (e.g. blank/spacer swiper slides).
    if (!img && !contentCell.length) return;

    // Each row is [image, content]
    const imageCell = img ? [img] : [''];
    cells.push([imageCell, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-news', cells });
  element.replaceWith(block);
}
