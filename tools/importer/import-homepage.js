/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS - All parsers for the homepage template
import heroLandingParser from './parsers/hero-landing.js';
import heroBannerParser from './parsers/hero-banner.js';
import columnsArticleParser from './parsers/columns-article.js';
import columnsFaqParser from './parsers/columns-faq.js';
import cardsGalleryParser from './parsers/cards-gallery.js';
import cardsArticleParser from './parsers/cards-article.js';
import tabsTestimonialParser from './parsers/tabs-testimonial.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/wknd-trendsetters-cleanup.js';
import sectionsTransformer from './transformers/wknd-trendsetters-sections.js';

// PARSER REGISTRY - Map block variant names to parser functions
const parsers = {
  'hero-landing': heroLandingParser,
  'hero-banner': heroBannerParser,
  'columns-article': columnsArticleParser,
  'columns-faq': columnsFaqParser,
  'cards-gallery': cardsGalleryParser,
  'cards-article': cardsArticleParser,
  'tabs-testimonial': tabsTestimonialParser,
};

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'homepage',
  urls: [
    'https://wknd-trendsetters.site',
  ],
  description: 'Homepage template for WKND Trendsetters site',
  blocks: [
    {
      name: 'hero-landing',
      instances: ['header.section.secondary-section'],
    },
    {
      name: 'columns-article',
      instances: ['main > section.section:nth-of-type(1) .grid-layout.grid-gap-lg'],
    },
    {
      name: 'cards-gallery',
      instances: ['.grid-layout.desktop-4-column.grid-gap-sm'],
    },
    {
      name: 'tabs-testimonial',
      instances: ['.tabs-wrapper'],
    },
    {
      name: 'cards-article',
      instances: ['.grid-layout.desktop-4-column.grid-gap-md'],
    },
    {
      name: 'columns-faq',
      instances: ['.grid-layout.grid-gap-xxl'],
    },
    {
      name: 'hero-banner',
      instances: ['section.inverse-section .utility-position-relative'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: 'header.section.secondary-section',
      style: 'light-grey',
      blocks: ['hero-landing'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Article Feature',
      selector: 'main > section.section:nth-of-type(1)',
      style: null,
      blocks: ['columns-article'],
      defaultContent: [],
    },
    {
      id: 'section-3',
      name: 'Image Gallery',
      selector: 'main > section.section.secondary-section:nth-of-type(1)',
      style: 'light-grey',
      blocks: ['cards-gallery'],
      defaultContent: ['.utility-text-align-center h2', '.utility-text-align-center p'],
    },
    {
      id: 'section-4',
      name: 'Testimonials',
      selector: 'main > section.section:nth-of-type(3)',
      style: null,
      blocks: ['tabs-testimonial'],
      defaultContent: [],
    },
    {
      id: 'section-5',
      name: 'Latest Articles',
      selector: 'main > section.section.secondary-section:nth-of-type(2)',
      style: 'light-grey',
      blocks: ['cards-article'],
      defaultContent: ['.utility-text-align-center h2', '.utility-text-align-center p'],
    },
    {
      id: 'section-6',
      name: 'FAQ',
      selector: 'main > section.section:nth-of-type(5)',
      style: null,
      blocks: ['columns-faq'],
      defaultContent: [],
    },
    {
      id: 'section-7',
      name: 'CTA Banner',
      selector: 'section.section.inverse-section',
      style: 'dark',
      blocks: ['hero-banner'],
      defaultContent: [],
    },
  ],
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  sectionsTransformer,
];

/**
 * Execute all page transformers for a specific hook
 * @param {string} hookName - 'beforeTransform' or 'afterTransform'
 * @param {Element} element - The DOM element to transform
 * @param {Object} payload - The import payload
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page using template selectors
 * @param {Document} document - The DOM document
 * @param {Object} template - The PAGE_TEMPLATE object
 * @returns {Array} Array of { name, selector, element } objects
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index'
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
