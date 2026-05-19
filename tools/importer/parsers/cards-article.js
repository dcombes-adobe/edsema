/* eslint-disable */
/* global WebImporter */

/**
 * Parser: cards-article
 * Base: cards | Sources: https://www.nottingham.ac.uk/, https://wknd-trendsetters.site
 * Extracts article/event cards with image, date/category, title, and link.
 * Handles Nottingham events (.vertical-card) and WKND articles (a.article-card).
 * Generated: 2026-05-19
 */
export default function parse(element, { document }) {
  const cells = [];

  // --- Strategy 1: Nottingham events structure ---
  // Source: .vertical-card with .vertical-card-img, .date .day/.month, h3.event-title, a.inline-link
  const nottinghamCards = element.querySelectorAll('.vertical-card');

  if (nottinghamCards.length > 0) {
    nottinghamCards.forEach((card) => {
      // Cell 1: event image
      const img = card.querySelector('img.vertical-card-img, .col-md-4 img');

      // Cell 2: date + title + link
      const contentCell = [];

      // Date: combine day and month spans into a single paragraph
      const dayEl = card.querySelector('.date .day');
      const monthEl = card.querySelector('.date .month');
      if (dayEl && monthEl) {
        const datePara = document.createElement('p');
        datePara.textContent = `${dayEl.textContent.trim()} ${monthEl.textContent.trim()}`;
        contentCell.push(datePara);
      }

      // Event title (h3.event-title)
      const heading = card.querySelector('h3.event-title, .card-content h3');
      if (heading) contentCell.push(heading);

      // Read more link
      const link = card.querySelector('a.inline-link, .card-content a');
      if (link) contentCell.push(link);

      if (img || contentCell.length > 0) {
        cells.push([img || '', contentCell]);
      }
    });
  } else {
    // --- Strategy 2: WKND article cards structure (fallback) ---
    // Source: a.article-card with .tag, .paragraph-sm, h3, card href
    const wkndCards = element.querySelectorAll('a.article-card, a.card-link');

    if (wkndCards.length === 0) return;

    wkndCards.forEach((card) => {
      // Cell 1: card image
      const img = card.querySelector('.article-card-image img, img');

      // Cell 2: card body content
      const contentCell = [];

      // Category tag
      const tag = card.querySelector('.tag, .article-card-meta span.tag');
      if (tag) contentCell.push(tag);

      // Date
      const date = card.querySelector('.article-card-meta .paragraph-sm, .article-card-meta span.utility-text-secondary');
      if (date) contentCell.push(date);

      // Heading
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
  }

  if (cells.length === 0) return;

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
