/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroBannerParser from './parsers/hero-banner.js';
import heroSearchParser from './parsers/hero-search.js';
import cardsCampaignParser from './parsers/cards-campaign.js';
import cardsStatsParser from './parsers/cards-stats.js';
import columnsFeatureParser from './parsers/columns-feature.js';
import cardsImageCtaParser from './parsers/cards-image-cta.js';
import carouselNewsParser from './parsers/carousel-news.js';
import cardsArticleParser from './parsers/cards-article.js';
import columnsLogosParser from './parsers/columns-logos.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/nottingham-cleanup.js';
import sectionsTransformer from './transformers/nottingham-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-banner': heroBannerParser,
  'hero-search': heroSearchParser,
  'cards-campaign': cardsCampaignParser,
  'cards-stats': cardsStatsParser,
  'columns-feature': columnsFeatureParser,
  'cards-image-cta': cardsImageCtaParser,
  'carousel-news': carouselNewsParser,
  'cards-article': cardsArticleParser,
  'columns-logos': columnsLogosParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  sectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'nottingham-homepage',
  description: 'University of Nottingham main homepage with hero, search, course finder, news, events, and campus highlights',
  urls: [
    'https://www.nottingham.ac.uk/',
  ],
  blocks: [
    {
      name: 'hero-banner',
      instances: ['.homepage-hero-banner'],
    },
    {
      name: 'hero-search',
      instances: ['.search-section'],
    },
    {
      name: 'cards-campaign',
      instances: ['.homepage-campaign-tiles'],
    },
    {
      name: 'cards-stats',
      instances: ['.homepage-rankings'],
    },
    {
      name: 'columns-feature',
      instances: ['.homepage-image-cta-block'],
    },
    {
      name: 'cards-image-cta',
      instances: ['.homepage-image-cta-row'],
    },
    {
      name: 'carousel-news',
      instances: ['.news-carousel'],
    },
    {
      name: 'cards-article',
      instances: ['.events-section .row.g-4'],
    },
    {
      name: 'columns-logos',
      instances: ['.homepage-partnerships'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Banner',
      selector: '.homepage-hero-banner',
      style: null,
      blocks: ['hero-banner'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Course Finder',
      selector: '.search-section',
      style: null,
      blocks: ['hero-search'],
      defaultContent: [],
    },
    {
      id: 'section-3',
      name: 'Campaign Tiles',
      selector: '.homepage-campaign-tiles',
      style: null,
      blocks: ['cards-campaign'],
      defaultContent: [],
    },
    {
      id: 'section-4',
      name: 'Rankings',
      selector: '.homepage-rankings',
      style: 'dark',
      blocks: ['cards-stats'],
      defaultContent: [],
    },
    {
      id: 'section-5',
      name: 'Research',
      selector: '.homepage-bg-container',
      style: 'grey',
      blocks: ['columns-feature', 'cards-image-cta'],
      defaultContent: ['.homepage-bg-container > .container > h2'],
    },
    {
      id: 'section-6',
      name: 'University News',
      selector: '.news-events',
      style: null,
      blocks: ['carousel-news'],
      defaultContent: ['.news-events-title', '.news-events-all-link'],
    },
    {
      id: 'section-7',
      name: 'Featured Events',
      selector: '.events-section',
      style: null,
      blocks: ['cards-article'],
      defaultContent: ['.news-events-title', '.news-events-all-link'],
    },
    {
      id: 'section-8',
      name: 'Partner Logos',
      selector: '.homepage-partnerships',
      style: null,
      blocks: ['columns-logos'],
      defaultContent: [],
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
