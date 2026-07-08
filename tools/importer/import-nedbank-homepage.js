/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroVideoBannerParser from './parsers/hero-video-banner.js';
import cardsOverviewParser from './parsers/cards-overview.js';
import columnsFeatureParser from './parsers/columns-feature.js';
import cardsPromoParser from './parsers/cards-promo.js';
import cardsHelpParser from './parsers/cards-help.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/nedbank-cleanup.js';
import sectionsTransformer from './transformers/nedbank-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-video-banner': heroVideoBannerParser,
  'cards-overview': cardsOverviewParser,
  'columns-feature': columnsFeatureParser,
  'cards-promo': cardsPromoParser,
  'cards-help': cardsHelpParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  sectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'nedbank-homepage',
  description: 'Nedbank Personal homepage (category-landing): hero video banner, overview icon-card grid, content block, promotions cards, switch CTA card, text block',
  urls: [
    'https://personal.nedbank.co.za/',
  ],
  blocks: [
    {
      name: 'hero-video-banner',
      instances: ['#NBD_VIDEOBANNER_1'],
    },
    {
      name: 'cards-overview',
      instances: ['#NBD_OVERVIEWCARDS_1'],
    },
    {
      name: 'columns-feature',
      instances: ['#NBD_CONTENTBLOCK_1'],
    },
    {
      name: 'cards-promo',
      instances: ['#NBD_PROMOTIONCARDS_1'],
    },
    {
      name: 'cards-help',
      instances: ['#NBD_SWITCHCARD_1'],
      section: 'green',
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Video Banner',
      selector: '#NBD_VIDEOBANNER_1',
      style: 'light-green',
      blocks: ['hero-video-banner'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Overview Cards',
      selector: '#NBD_OVERVIEWCARDS_1',
      style: 'light-green',
      blocks: ['cards-overview'],
      defaultContent: ['#NBD_OVERVIEWCARDS_1 h2'],
    },
    {
      id: 'section-3',
      name: 'Content Block',
      selector: '#NBD_CONTENTBLOCK_1',
      style: null,
      blocks: ['columns-feature'],
      defaultContent: [],
    },
    {
      id: 'section-4',
      name: 'Promotion Cards',
      selector: '#NBD_PROMOTIONCARDS_1',
      style: null,
      blocks: ['cards-promo'],
      defaultContent: ['#NBD_PROMOTIONCARDS_1 .nbd-promoc-heading'],
    },
    {
      id: 'section-5',
      name: 'Switch Card',
      selector: '#NBD_SWITCHCARD_1',
      style: 'green',
      blocks: ['cards-help'],
      defaultContent: [],
    },
    {
      id: 'section-6',
      name: 'Text Block',
      selector: '#NBD_TEXT_1',
      style: null,
      blocks: [],
      defaultContent: ['#NBD_TEXT_1 h4', '#NBD_TEXT_1 p'],
    },
  ],
};

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    // 1. Execute beforeTransform transformers (cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using template selectors
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return; // Already replaced by earlier parser
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      }
    });

    // 4. Execute afterTransform transformers (section breaks + metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index',
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
