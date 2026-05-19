/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: nottingham sections
 * Creates section breaks and section-metadata blocks based on template sections.
 * Selectors validated against migration-work/cleaned.html
 *
 * Sections from page-templates.json (nottingham-homepage):
 *   1. Hero Banner (.homepage-hero-banner) - no style
 *   2. Course Finder (.search-section) - no style
 *   3. Campaign Tiles (.homepage-campaign-tiles) - no style
 *   4. Rankings (.homepage-rankings) - style: "dark"
 *   5. Research (.homepage-bg-container) - style: "grey"
 *   6. University News (.news-events) - no style
 *   7. Featured Events (.events-section) - no style
 *   8. Partner Logos (.homepage-partnerships) - no style
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { document } = payload;
    const sections = payload.template && payload.template.sections;

    if (!sections || sections.length < 2) return;

    // Process sections in reverse order to preserve DOM positions
    const reversedSections = [...sections].reverse();

    reversedSections.forEach((section, reverseIndex) => {
      const originalIndex = sections.length - 1 - reverseIndex;
      const sectionEl = element.querySelector(section.selector);

      if (!sectionEl) return;

      // Add section-metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(sectionMetadata);
      }

      // Insert <hr> before each section except the first
      if (originalIndex > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    });
  }
}
