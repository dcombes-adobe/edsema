/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: nedbank cleanup
 * Removes non-authorable site chrome and AEM/bootstrap markup noise from the
 * Nedbank Personal homepage before it is converted to EDS content.
 *
 * ALL selectors validated against migration-work/cleaned.html (the scraped
 * https://personal.nedbank.co.za/ DOM). No guessed selectors.
 *
 * Removed:
 *   beforeTransform (blocks/overlays that would interfere with block parsing):
 *     - .cookiealert                         cookie consent banner (line 1087)
 *   afterTransform (non-authorable chrome + tracking + AEM grid cruft):
 *     - #NBD_NEDBANK-NAVIGATION_1             full navigation component (line 21)
 *     - #stickyheader                         sticky nav bar within navigation (line 29)
 *     - div.footer / footer.page-footer       site footer component (lines 728-729)
 *     - #destination_publishing_iframe_...    Adobe demdex ID-sync iframe (line 1105)
 *     - #ZN_3KxZKKjUdOy8PQW                   Qualtrics feedback snippet (line 1114)
 *     - tracking <img> (t.co / analytics.twitter.com) (lines 1107-1119)
 *     - doubleclick activity <iframe>         (line 1120)
 *     - hidden AEM input hooks (#domainproperty, #loadonclick, #domainName,
 *       #homevariationinherited, #hidedomainlinks) (lines 2-3, 25-27)
 *     - link / noscript                       non-authorable head/script leftovers
 *
 * NOTE: card-footer (block content), #nbd-vbanner-video-div (.modal fade inside
 * the hero video banner block) and .btn-floating (footer social links, removed
 * with the footer) are authorable/block content and are intentionally NOT
 * blanket-removed.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Cookie consent banner - overlay that is not authorable
    WebImporter.DOMUtils.remove(element, ['.cookiealert']);

    // Non-authorable site chrome: navigation + footer.
    // Removed in beforeTransform (before block parsing) so residual nav markup
    // (mobile-navigation, logo, share icons) never leaks into the first section.
    // Both ID and class selectors are used because the importer may strip IDs.
    WebImporter.DOMUtils.remove(element, [
      '#NBD_NEDBANK-NAVIGATION_1',
      '.nedbank-navigation',
      '.navigation',
      '.mobile-navigation',
      '.nbd-header-container',
      '.nbd-navbar-desktop-wrapper',
      '.nbd-social-share-wrapper',
      '.search-login',
      '#stickyheader',
      '.primarynav',
      '[id^="NBD_SOCIALSHARE_"]',
      '[id^="NBD_FOOTER_"]',
      '[id^="NBD_LISTPOPUP_"]',
      '.nbd-listpopup-container',
      '#logincomp',
      '#searchcomp',
      '.modal',
      'div.footer',
      'footer.page-footer',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Non-authorable site chrome: navigation + footer (defensive re-removal)
    WebImporter.DOMUtils.remove(element, [
      '#NBD_NEDBANK-NAVIGATION_1',
      '.nedbank-navigation',
      '.mobile-navigation',
      '.nbd-social-share-wrapper',
      '.search-login',
      '#stickyheader',
      '[id^="NBD_SOCIALSHARE_"]',
      '[id^="NBD_FOOTER_"]',
      '[id^="NBD_LISTPOPUP_"]',
      '.nbd-listpopup-container',
      '#logincomp',
      '#searchcomp',
      '.modal',
      'div.footer',
      'footer.page-footer',
    ]);

    // Analytics / tracking / feedback widgets (non-authorable)
    WebImporter.DOMUtils.remove(element, [
      '#destination_publishing_iframe_nedbank_0',
      '#ZN_3KxZKKjUdOy8PQW',
    ]);

    // Tracking pixels: twitter (t.co / analytics.twitter.com) and doubleclick iframes
    element.querySelectorAll('img[src*="t.co/"], img[src*="analytics.twitter.com"], img[src*="doubleclick"]').forEach((img) => img.remove());
    element.querySelectorAll('iframe[src*="doubleclick"], iframe[src*="demdex.net"], iframe[src*="fls."]').forEach((iframe) => iframe.remove());

    // Hidden AEM state inputs (not authorable content)
    WebImporter.DOMUtils.remove(element, [
      '#domainproperty',
      '#loadonclick',
      '#domainName',
      '#homevariationinherited',
      '#hidedomainlinks',
    ]);

    // Non-authorable leftovers
    WebImporter.DOMUtils.remove(element, ['link', 'noscript']);
  }
}
