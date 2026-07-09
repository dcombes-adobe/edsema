/**
 * hero-product block
 * Product hero: heading + intro + CTA on the left, supporting photo on the right.
 * Authored structure: one row with cell(s). If a cell contains a picture it is
 * treated as the image; the remaining text becomes the content column.
 * @param {Element} block
 */
export default function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const imageCell = cells.find((c) => c.querySelector('picture, img'));
  const textCells = cells.filter((c) => c !== imageCell);

  block.textContent = '';

  const content = document.createElement('div');
  content.className = 'hero-product-content';
  textCells.forEach((c) => {
    while (c.firstChild) content.append(c.firstChild);
  });
  block.append(content);

  if (imageCell) {
    const image = document.createElement('div');
    image.className = 'hero-product-image';
    while (imageCell.firstChild) image.append(imageCell.firstChild);
    block.append(image);
  } else {
    block.classList.add('no-image');
  }
}
