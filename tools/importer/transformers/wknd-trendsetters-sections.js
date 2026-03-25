/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: wknd-trendsetters sections.
 * Adds section breaks (<hr>) and Section Metadata blocks.
 * Uses payload.template.sections from page-templates.json.
 * Runs in afterTransform only.
 *
 * Uses index-based matching: finds all section-level elements
 * (header.section, section.section) in DOM order and maps them
 * to template sections by position.
 */
export default function transform(hookName, element, payload) {
  if (hookName === 'afterTransform') {
    const sections = payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    const document = element.ownerDocument;

    // Find main content area (element may be body or main)
    const mainEl = element.querySelector('main') || element;

    // Find all section-level elements in DOM order
    // From captured DOM: header.section and section.section are direct children of main
    const sectionEls = Array.from(
      mainEl.querySelectorAll(':scope > header.section, :scope > section.section')
    );

    // Process in reverse to avoid DOM position shifts
    for (let i = sections.length - 1; i >= 0; i--) {
      const section = sections[i];

      // Match by index (sections in template match DOM order)
      let sectionEl = sectionEls[i];

      // Fallback: try selector from template if index doesn't match
      if (!sectionEl) {
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        for (const sel of selectors) {
          sectionEl = mainEl.querySelector(sel)
            || element.querySelector(sel)
            || document.querySelector(sel);
          if (sectionEl) break;
        }
      }

      if (!sectionEl) continue;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.append(metaBlock);
      }

      // Add <hr> before section (except first)
      if (i > 0) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
