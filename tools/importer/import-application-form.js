/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import cardsInfoParser from './parsers/cards-info.js';
import cardsChecklistParser from './parsers/cards-checklist.js';
import cardsCtaParser from './parsers/cards-cta.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/nedbank-cleanup.js';
import sectionsTransformer from './transformers/nedbank-sections.js';

// PARSER REGISTRY
const parsers = {
  'cards-info': cardsInfoParser,
  'cards-checklist': cardsChecklistParser,
  'cards-cta': cardsCtaParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  sectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'application-form',
  description: 'Nedbank ready-to-apply application page: things-to-know info cards, documents checklist, ways-to-open CTA cards, footer notes',
  urls: [
    'https://personal.nedbank.co.za/save-and-invest/accounts/in-24hrs/justinvest/ready-to-apply.html',
  ],
  blocks: [
    { name: 'cards-info', instances: ['#NBD_ELIGIBILITYNEEDS_1 .eligibility .qualify-list'] },
    { name: 'cards-checklist', instances: ['#NBD_ELIGIBILITYNEEDS_1 .eligibility .doclist'] },
    { name: 'cards-cta', instances: ['#NBD_ELIGIBILITYCHANNELS_1 .channel'] },
  ],
  sections: [
    { id: 'section-1', name: 'Things to Know', selector: '#NBD_ELIGIBILITYNEEDS_1', style: null, blocks: ['cards-info', 'cards-checklist'], defaultContent: ['#NBD_ELIGIBILITYNEEDS_1 h2'] },
    { id: 'section-2', name: 'Ways to Open', selector: '#NBD_ELIGIBILITYCHANNELS_1', style: null, blocks: ['cards-cta'], defaultContent: ['#NBD_ELIGIBILITYCHANNELS_1 h2'] },
    { id: 'section-3', name: 'Footer Notes', selector: '#NBD_TEXT_1', style: null, blocks: [], defaultContent: ['#NBD_TEXT_1 .cmp-text.customtext'] },
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
