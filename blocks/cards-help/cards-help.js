import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

/**
 * cards-help block
 * Structure: a set of white "help" cards (icon + title + description + arrow links)
 * plus a promo panel (title + description + CTA) that has no icon/image.
 *
 * Authored rows:
 *   - help card row:  [ cell: <picture> ] [ cell: h4 + p + link paragraphs ]
 *   - promo row:      [ empty cell ]      [ cell: h2 + p + CTA link ]
 */
export default function decorate(block) {
  const cardsWrap = document.createElement('div');
  cardsWrap.className = 'cards-help-cards';
  const promoWrap = document.createElement('div');
  promoWrap.className = 'cards-help-promo';

  [...block.children].forEach((row) => {
    const cells = [...row.children];
    const picture = row.querySelector('picture');
    const isPromo = !!row.querySelector('h2') && !picture;

    if (isPromo) {
      const article = document.createElement('div');
      article.className = 'cards-help-promo-inner';
      moveInstrumentation(row, article);
      // move all non-empty cells' content into the promo panel
      cells.forEach((cell) => {
        if (cell.childElementCount || cell.textContent.trim()) {
          while (cell.firstElementChild) article.append(cell.firstElementChild);
        }
      });
      promoWrap.append(article);
      return;
    }

    const card = document.createElement('div');
    card.className = 'cards-help-card';
    moveInstrumentation(row, card);
    cells.forEach((cell) => {
      if (cell.querySelector('picture')) {
        const iconEl = document.createElement('div');
        iconEl.className = 'cards-help-card-icon';
        while (cell.firstElementChild) iconEl.append(cell.firstElementChild);
        card.append(iconEl);
      } else {
        const body = document.createElement('div');
        body.className = 'cards-help-card-body';
        // separate the description block from the links footer
        const links = document.createElement('div');
        links.className = 'cards-help-card-links';
        [...cell.children].forEach((el) => {
          const isLinkPara = el.tagName === 'P' && el.querySelector('a');
          if (isLinkPara) links.append(el);
          else body.append(el);
        });
        card.append(body);
        if (links.childElementCount) card.append(links);
      }
    });
    cardsWrap.append(card);
  });

  block.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '80' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  block.textContent = '';
  if (cardsWrap.childElementCount) block.append(cardsWrap);
  if (promoWrap.childElementCount) block.append(promoWrap);
}
