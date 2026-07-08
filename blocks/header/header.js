import { getMetadata } from '../../scripts/aem.js';

const isDesktop = window.matchMedia('(min-width: 900px)');

async function fetchNav() {
  let resp = await fetch('/content/nav.plain.html');
  if (!resp.ok) {
    const navMeta = getMetadata('nav');
    const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
    resp = await fetch(`${navPath}.plain.html`);
  }
  if (!resp.ok) return null;
  const html = await resp.text();
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp;
}

function closeAllDropdowns(nav) {
  nav.querySelectorAll('.nav-drop[aria-expanded="true"]').forEach((li) => {
    li.setAttribute('aria-expanded', 'false');
  });
}

/**
 * loads and decorates the header nav
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const fragment = await fetchNav();
  block.textContent = '';
  if (!fragment) return;

  const nav = document.createElement('nav');
  nav.id = 'nav';
  while (fragment.firstElementChild) nav.append(fragment.firstElementChild);

  // Section 0 = brand/utility bar, Section 1 = main menu
  const [brandRow, menuRow] = nav.children;
  if (brandRow) brandRow.classList.add('nav-brand-row');
  if (menuRow) menuRow.classList.add('nav-menu-row');

  // Brand row: first <ul> is audience switcher, second <ul> is tools
  if (brandRow) {
    const uls = brandRow.querySelectorAll(':scope > ul');
    if (uls[0]) uls[0].classList.add('nav-audience');
    if (uls[1]) uls[1].classList.add('nav-tools');
    const logoP = brandRow.querySelector(':scope > p');
    if (logoP) logoP.classList.add('nav-logo');
  }

  // Main menu row: each top-level <li> with a nested <ul> is a dropdown
  if (menuRow) {
    const topList = menuRow.querySelector(':scope > ul');
    if (topList) topList.classList.add('nav-menu');
    menuRow.querySelectorAll(':scope > ul > li').forEach((li) => {
      const submenu = li.querySelector(':scope > ul');
      if (submenu) {
        li.classList.add('nav-drop');
        li.setAttribute('aria-expanded', 'false');
        const trigger = li.querySelector(':scope > a');

        // Desktop: hover opens
        li.addEventListener('mouseenter', () => {
          if (isDesktop.matches) {
            closeAllDropdowns(nav);
            li.setAttribute('aria-expanded', 'true');
          }
        });
        li.addEventListener('mouseleave', () => {
          if (isDesktop.matches) li.setAttribute('aria-expanded', 'false');
        });

        // Click toggles (works on desktop + touch)
        if (trigger) {
          trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const expanded = li.getAttribute('aria-expanded') === 'true';
            closeAllDropdowns(nav);
            li.setAttribute('aria-expanded', expanded ? 'false' : 'true');
          });
        }
      }
    });
  }

  // Close dropdowns on outside click / escape
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target)) closeAllDropdowns(nav);
  });
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Escape') closeAllDropdowns(nav);
  });

  // Hamburger for mobile
  const hamburger = document.createElement('div');
  hamburger.classList.add('nav-hamburger');
  hamburger.innerHTML = `<button type="button" aria-controls="nav" aria-label="Open navigation">
      <span class="nav-hamburger-icon"></span>
    </button>`;
  hamburger.addEventListener('click', () => {
    const expanded = nav.getAttribute('aria-expanded') === 'true';
    nav.setAttribute('aria-expanded', expanded ? 'false' : 'true');
    document.body.style.overflowY = expanded ? '' : 'hidden';
    hamburger.querySelector('button').setAttribute('aria-label', expanded ? 'Open navigation' : 'Close navigation');
  });
  nav.prepend(hamburger);
  nav.setAttribute('aria-expanded', 'false');

  // Reset state when crossing the desktop/mobile breakpoint
  isDesktop.addEventListener('change', () => {
    closeAllDropdowns(nav);
    nav.setAttribute('aria-expanded', 'false');
    document.body.style.overflowY = '';
    hamburger.querySelector('button').setAttribute('aria-label', 'Open navigation');
  });

  const navWrapper = document.createElement('div');
  navWrapper.className = 'nav-wrapper';
  navWrapper.append(nav);
  block.append(navWrapper);
}
