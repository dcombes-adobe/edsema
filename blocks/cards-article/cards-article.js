import { createOptimizedPicture } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    moveInstrumentation(row, li);
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      if (div.children.length === 1 && div.querySelector('picture')) div.className = 'cards-article-card-image';
      else div.className = 'cards-article-card-body';
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => {
    const optimizedPic = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
    moveInstrumentation(img, optimizedPic.querySelector('img'));
    img.closest('picture').replaceWith(optimizedPic);
  });

  // Split category+date in meta paragraph (e.g. "Casual CoolMay 12")
  const months = 'Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec';
  const dateRegex = new RegExp(`(${months})\\s*\\d+`);
  ul.querySelectorAll('.cards-article-card-body').forEach((body) => {
    const metaP = body.querySelector('p:first-child');
    if (metaP && !metaP.querySelector('img') && !metaP.querySelector('a')) {
      const text = metaP.textContent;
      const match = text.match(dateRegex);
      if (match) {
        const dateIdx = text.indexOf(match[0]);
        const category = text.substring(0, dateIdx).trim();
        const date = match[0].trim();
        if (category && date) {
          metaP.innerHTML = `<span class="cards-article-tag">${category}</span><span class="cards-article-date">${date}</span>`;
        }
      }
    }
  });

  block.textContent = '';
  block.append(ul);
}
