import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * cards-cta: "ways to open" style call-to-action cards.
 * Each card is a title (+ optional supporting text) with a single link.
 * The whole card becomes clickable (stretched link) and shows a trailing arrow.
 * Cards alternate dark / light styling via nth-child in CSS; an author can also
 * mark a card dark by making its variant explicit in the section (see CSS).
 */
export default function decorate(block) {
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-cta-card-image';
      else div.className = 'cards-cta-card-body';
    });

    // Make the whole card clickable using the first link inside it.
    const link = li.querySelector('a[href]');
    if (link) {
      link.classList.add('cards-cta-link');
      li.classList.add('cards-cta-clickable');
    }
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);
}
