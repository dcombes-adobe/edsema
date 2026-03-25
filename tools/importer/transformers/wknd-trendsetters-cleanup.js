/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: wknd-trendsetters cleanup.
 * Selectors from captured DOM of https://wknd-trendsetters.site
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove skip link (from captured DOM: a.skip-link)
    WebImporter.DOMUtils.remove(element, ['a.skip-link']);
  }
  if (hookName === H.after) {
    // Remove non-authorable content from captured DOM:
    // .navbar - main site navigation bar with mega menu
    // footer.footer - site footer with social links and footer navigation
    // link - stylesheet link elements
    // noscript - noscript fallback elements
    WebImporter.DOMUtils.remove(element, ['.navbar', 'footer.footer', 'link', 'noscript']);
  }
}
