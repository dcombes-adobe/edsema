/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroProductParser from './parsers/hero-product.js';
import cardsChecklistParser from './parsers/cards-checklist.js';
import columnsFeatureParser from './parsers/columns-feature.js';
import cardsCoverParser from './parsers/cards-cover.js';
import cardsStepsParser from './parsers/cards-steps.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/nedbank-cleanup.js';
import sectionsTransformer from './transformers/nedbank-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-product': heroProductParser,
  'cards-checklist': cardsChecklistParser,
  'columns-feature': columnsFeatureParser,
  'cards-cover': cardsCoverParser,
  'cards-steps': cardsStepsParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  sectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'product-detail-insurance',
  description: 'Nedbank insurance product page: hero with CTA, why-choose checklist, content split, cover-type icon cards, numbered claims process',
  urls: [
    'https://personal.nedbank.co.za/insure/business-cover.html',
  ],
  blocks: [
    { name: 'hero-product', instances: ['#NBD_BANNER_1'] },
    { name: 'cards-checklist', instances: ['#NBD_WHYCHOOSE_1'] },
    { name: 'columns-feature', instances: ['#NBD_CONTENTBLOCK_1'] },
    { name: 'cards-cover', instances: ['#NBD_ILLUSTRATIONCARD_1'] },
    { name: 'cards-steps', instances: ['#NBD_APPLICATIONPROCESS_1'], section: 'light-green' },
  ],
  sections: [
    { id: 'section-1', name: 'Hero', selector: '#NBD_BANNER_1', style: null, blocks: ['hero-product'], defaultContent: [] },
    { id: 'section-2', name: 'Why Choose', selector: '#NBD_WHYCHOOSE_1', style: null, blocks: ['cards-checklist'], defaultContent: ['#NBD_WHYCHOOSE_1 h2'] },
    { id: 'section-3', name: 'Content Split', selector: '#NBD_CONTENTBLOCK_1', style: null, blocks: ['columns-feature'], defaultContent: [] },
    { id: 'section-4', name: 'Cover Types', selector: '#NBD_ILLUSTRATIONCARD_1', style: null, blocks: ['cards-cover'], defaultContent: ['#NBD_ILLUSTRATIONCARD_1 h2'] },
    { id: 'section-5', name: 'Claims Process', selector: '#NBD_APPLICATIONPROCESS_1', style: 'light-green', blocks: ['cards-steps'], defaultContent: ['#NBD_APPLICATIONPROCESS_1 h2'] },
  ],
};

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

    executeTransformers('beforeTransform', main, payload);

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return;
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      }
    });

    executeTransformers('afterTransform', main, payload);

    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

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
