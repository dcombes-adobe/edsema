// eslint-disable-next-line import/no-unresolved
import { toClassName } from '../../scripts/aem.js';
import { moveInstrumentation } from '../../scripts/scripts.js';

export default async function decorate(block) {
  // build tablist
  const tablist = document.createElement('div');
  tablist.className = 'tabs-testimonial-list';
  tablist.setAttribute('role', 'tablist');

  // decorate tabs and tabpanels
  const tabs = [...block.children].map((child) => child.firstElementChild);
  tabs.forEach((tab, i) => {
    const id = toClassName(tab.textContent);

    // decorate tabpanel
    const tabpanel = block.children[i];
    tabpanel.className = 'tabs-testimonial-panel';
    tabpanel.id = `tabpanel-${id}`;
    tabpanel.setAttribute('aria-hidden', !!i);
    tabpanel.setAttribute('aria-labelledby', `tab-${id}`);
    tabpanel.setAttribute('role', 'tabpanel');

    // build tab button
    const button = document.createElement('button');
    button.className = 'tabs-testimonial-tab';
    button.id = `tab-${id}`;

    moveInstrumentation(tab.parentElement, tabpanel.lastElementChild);

    // Extract avatar from panel content and add to tab
    const panelDiv = tabpanel.lastElementChild;
    const panelImg = panelDiv?.querySelector('img');
    const wrapper = document.createElement('div');
    wrapper.className = 'tabs-testimonial-tab-content';

    if (panelImg) {
      const avatar = document.createElement('img');
      // Use dedicated avatar image based on person's first name
      const firstName = tab.textContent.trim().split(/\s+/)[0].toLowerCase();
      try {
        const imgUrl = new URL(panelImg.src);
        avatar.src = `${imgUrl.origin}${imgUrl.pathname.substring(0, imgUrl.pathname.lastIndexOf('/'))}/avatar-${firstName}.avif`;
      } catch (e) {
        avatar.src = panelImg.src;
      }
      avatar.alt = panelImg.alt || '';
      avatar.className = 'tabs-testimonial-tab-avatar';
      wrapper.appendChild(avatar);
    }

    const textDiv = document.createElement('div');
    textDiv.innerHTML = tab.innerHTML;

    // Add role subtitle from panel content to text area
    if (panelDiv) {
      const strongEl = panelDiv.querySelector('strong');
      const roleP = strongEl?.closest('p')?.nextElementSibling;
      if (roleP && roleP.tagName === 'P' && !roleP.textContent.startsWith('"')) {
        const subtitle = document.createElement('span');
        subtitle.className = 'tabs-testimonial-tab-subtitle';
        subtitle.textContent = roleP.textContent;
        textDiv.appendChild(subtitle);
      }
    }

    wrapper.appendChild(textDiv);
    button.appendChild(wrapper);

    button.setAttribute('aria-controls', `tabpanel-${id}`);
    button.setAttribute('aria-selected', !i);
    button.setAttribute('role', 'tab');
    button.setAttribute('type', 'button');
    button.addEventListener('click', () => {
      block.querySelectorAll('[role=tabpanel]').forEach((panel) => {
        panel.setAttribute('aria-hidden', true);
      });
      tablist.querySelectorAll('button').forEach((btn) => {
        btn.setAttribute('aria-selected', false);
      });
      tabpanel.setAttribute('aria-hidden', false);
      button.setAttribute('aria-selected', true);
    });
    tablist.append(button);
    tab.remove();
    moveInstrumentation(button.querySelector('p'), null);
  });

  block.prepend(tablist);
}
