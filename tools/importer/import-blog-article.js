/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import columnsArticleParser from './parsers/columns-article.js';
import carouselNewsParser from './parsers/carousel-news.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/nedbank-cleanup.js';
import sectionsTransformer from './transformers/nedbank-sections.js';

// PARSER REGISTRY
const parsers = {
  'columns-article': columnsArticleParser,
  'carousel-news': carouselNewsParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  sectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'blog-article',
  description: 'Nedbank blog article: hero banner (title/author/date over image), article body (default content), related-posts carousel',
  urls: [
    'https://personal.nedbank.co.za/learn/blog/5-reasons-not-to-withdraw-cash-from-a-credit-card.html',
  ],
  blocks: [
    {
      name: 'columns-article',
      instances: ['.nbd-article-banner-bg-img'],
    },
    {
      name: 'carousel-news',
      instances: ['.nbd-related-posts-wrapper'],
      section: 'green',
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero Banner',
      selector: '.nbd-article-banner-bg-img',
      style: null,
      blocks: ['columns-article'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Article Body',
      selector: '.cmp-text.customtext',
      style: null,
      blocks: [],
      defaultContent: ['.cmp-text.customtext'],
    },
    {
      id: 'section-3',
      name: 'Related Posts',
      selector: '.nbd-related-posts-wrapper',
      style: 'green',
      blocks: ['carousel-news'],
      defaultContent: ['.nbd-related-posts-wrapper h2'],
    },
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
