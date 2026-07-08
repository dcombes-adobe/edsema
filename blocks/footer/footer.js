import { getMetadata } from '../../scripts/aem.js';

async function fetchFooter() {
  let resp = await fetch('/content/footer.plain.html');
  if (!resp.ok) {
    const footerMeta = getMetadata('footer');
    const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
    resp = await fetch(`${footerPath}.plain.html`);
  }
  if (!resp.ok) return null;
  const html = await resp.text();
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp;
}

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const fragment = await fetchFooter();
  block.textContent = '';
  if (!fragment) return;

  const footer = document.createElement('div');
  footer.className = 'footer-content';
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  const sections = footer.children;
  // First N-1 sections are link columns; last section is the brand/legal bar.
  const lastIndex = sections.length - 1;
  Array.from(sections).forEach((section, i) => {
    if (i === lastIndex) {
      section.classList.add('footer-bottom');
    } else {
      section.classList.add('footer-column');
    }
  });

  // Tag the social icon list in the bottom bar for styling
  const bottom = footer.querySelector('.footer-bottom');
  if (bottom) {
    const socialList = bottom.querySelector('ul');
    if (socialList) socialList.classList.add('footer-social');
    const logoP = bottom.querySelector('p');
    if (logoP && logoP.querySelector('img')) logoP.classList.add('footer-logo');
  }

  block.append(footer);
}
