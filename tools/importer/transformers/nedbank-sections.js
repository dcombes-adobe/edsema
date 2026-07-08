/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: nedbank sections
 * Creates section breaks (<hr>) and Section Metadata blocks based on the
 * nedbank-homepage template sections in tools/importer/page-templates.json.
 *
 * Section selectors validated against migration-work/cleaned.html (stable AEM
 * component IDs). No guessed selectors.
 *
 * Sections from page-templates.json (nedbank-homepage):
 *   1. Hero Video Banner (#NBD_VIDEOBANNER_1)   - style: "light-green"
 *   2. Overview Cards    (#NBD_OVERVIEWCARDS_1)  - style: "light-green"
 *   3. Content Block     (#NBD_CONTENTBLOCK_1)   - no style
 *   4. Promotion Cards   (#NBD_PROMOTIONCARDS_1) - no style
 *   5. Switch Card       (#NBD_SWITCHCARD_1)     - style: "green"
 *   6. Text Block        (#NBD_TEXT_1)           - no style
 *
 * Expected: 5 <hr> (sections.length - 1) and 3 Section Metadata blocks
 * (sections with a style).
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  // Run in beforeTransform: the block parsers replace the section elements
  // (#NBD_VIDEOBANNER_1, etc.) in place during parsing, so by afterTransform
  // these selectors no longer exist. Inserting <hr>/Section Metadata as siblings
  // here — before parsing — keeps them correctly positioned around each block
  // after the parser's in-place replaceWith runs.
  if (hookName === TransformHook.beforeTransform) {
    const { document } = payload;
    const sections = payload.template && payload.template.sections;

    if (!sections || sections.length < 2) return;

    // Process sections in reverse order to preserve DOM positions
    const reversedSections = [...sections].reverse();

    reversedSections.forEach((section, reverseIndex) => {
      const originalIndex = sections.length - 1 - reverseIndex;
      const sectionEl = element.querySelector(section.selector);

      if (!sectionEl) return;

      // Add Section Metadata block if section has a style
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
