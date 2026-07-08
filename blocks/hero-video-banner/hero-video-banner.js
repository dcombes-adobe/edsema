/**
 * hero-video-banner
 * Full-bleed banner with a top heading + CTA overlay and a supporting
 * text panel (subheading + paragraph) below.
 *
 * Authored structure (single cell): h1, p>a (CTA), h3, p...
 * This groups the top (h1 + CTA) and bottom (h3 + paragraphs) into
 * distinct zones so they can be styled as an overlay and a panel.
 */
export default function decorate(block) {
  const cell = block.querySelector(':scope > div > div');
  if (!cell) return;

  // No background image supplied -> render heading in dark text.
  if (!cell.querySelector('picture')) {
    block.classList.add('no-image');
  }

  // Group the top overlay content (heading + first CTA link).
  const overlay = document.createElement('div');
  overlay.className = 'hero-video-banner-overlay';

  // Group the supporting text panel (subheading + remaining paragraphs).
  const panel = document.createElement('div');
  panel.className = 'hero-video-banner-panel';

  const h3 = cell.querySelector('h3, h4, h5, h6');
  const nodes = [...cell.children];
  let inPanel = false;
  nodes.forEach((node) => {
    if (h3 && node === h3) inPanel = true;
    (inPanel ? panel : overlay).append(node);
  });

  cell.textContent = '';
  if (overlay.childNodes.length) cell.append(overlay);
  if (panel.childNodes.length) cell.append(panel);
}
