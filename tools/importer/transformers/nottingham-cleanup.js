/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: nottingham cleanup
 * Removes non-authorable content from University of Nottingham pages.
 * Selectors validated against migration-work/cleaned.html
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Cookie consent banner (blocks page interaction/parsing)
    // Found: <div id="onetrust-consent-sdk"> and <div class="onetrust-pc-dark-filter ...">
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
      '.onetrust-pc-dark-filter',
    ]);

    // ASP.NET form wrapper - unwrap children, don't remove content
    // Found: <form id="form1"> wrapping all page content
    const form = element.querySelector('form#form1');
    if (form) {
      while (form.firstChild) {
        form.parentNode.insertBefore(form.firstChild, form);
      }
      form.remove();
    }

    // Hidden ASP.NET inputs
    // Found: <div class="aspNetHidden"> (2 instances)
    WebImporter.DOMUtils.remove(element, ['.aspNetHidden']);

    // Flyout navigation overlay (blocks content parsing)
    // Found: <div class="flyout" id="flyoutNav">
    WebImporter.DOMUtils.remove(element, ['.flyout']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Header components (non-authorable site chrome)
    // Found: <div class="headerv2-component">, <header class="headerv2">
    WebImporter.DOMUtils.remove(element, [
      '.headerv2-component',
      'header.headerv2',
    ]);

    // Skip-to-content link (non-authorable accessibility chrome)
    // Found: <div class="headerv2-skip-content-link">
    WebImporter.DOMUtils.remove(element, ['.headerv2-skip-content-link']);

    // Footer (non-authorable site chrome)
    // Found: <footer id="footer">
    WebImporter.DOMUtils.remove(element, ['footer#footer', 'footer']);

    // Remove any remaining script, noscript, link elements
    WebImporter.DOMUtils.remove(element, ['script', 'noscript', 'link']);
  }
}
