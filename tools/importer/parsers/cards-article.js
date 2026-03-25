/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-article
 * Base: cards | Source: https://wknd-trendsetters.site
 * Extracts article cards with image, category tag, date, and title.
 * Generated: 2026-03-24
 */
export default function parse(element, { document }) {
  // Extract all article cards (from captured DOM: a.article-card.card-link)
  const cards = element.querySelectorAll('a.article-card, a.card-link');

  // Guard: only parse if element contains article cards
  if (cards.length === 0) return;

  const cells = [];
  cards.forEach((card) => {
    // Cell 1: card image (from captured DOM: .article-card-image img.cover-image)
    const img = card.querySelector('.article-card-image img, img');

    // Cell 2: card body content
    const contentCell = [];

    // Category tag (from captured DOM: .article-card-meta span.tag)
    const tag = card.querySelector('.tag, .article-card-meta span.tag');
    if (tag) contentCell.push(tag);

    // Date (from captured DOM: .article-card-meta .paragraph-sm)
    const date = card.querySelector('.article-card-meta .paragraph-sm, .article-card-meta span.utility-text-secondary');
    if (date) contentCell.push(date);

    // Heading (from captured DOM: h3.h4-heading)
    const heading = card.querySelector('h3, .h4-heading');
    if (heading) contentCell.push(heading);

    // Article link - create CTA with the card's href
    const href = card.getAttribute('href');
    if (href) {
      const link = document.createElement('a');
      link.href = href;
      link.textContent = heading ? heading.textContent.trim() : 'Read more';
      contentCell.push(link);
    }

    if (img) {
      cells.push([img, contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
