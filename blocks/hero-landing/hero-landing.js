export default function decorate(block) {
  if (!block.querySelector(':scope > div:first-child picture')) {
    block.classList.add('no-image');
  }

  // Decorate CTA buttons in text column
  const textCol = block.querySelector(':scope > div:last-child');
  if (textCol) {
    const links = [...textCol.querySelectorAll('a[href]')];
    links.forEach((a, i) => {
      const p = a.closest('p');
      if (p && p.textContent.trim() === a.textContent.trim()) {
        p.className = 'button-wrapper';
        a.className = `button ${i === 0 ? 'primary' : 'secondary'}`;
      }
    });
  }
}
