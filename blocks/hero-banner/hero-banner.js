export default function decorate(block) {
  if (!block.querySelector(':scope > div:first-child picture')) {
    block.classList.add('no-image');
  }

  // Decorate CTA button in text column
  const textCol = block.querySelector(':scope > div:last-child');
  if (textCol) {
    const links = [...textCol.querySelectorAll('a[href]')];
    links.forEach((a) => {
      const p = a.closest('p');
      if (p && p.textContent.trim() === a.textContent.trim()) {
        p.className = 'button-wrapper';
        a.className = 'button primary';
      }
    });
  }
}
