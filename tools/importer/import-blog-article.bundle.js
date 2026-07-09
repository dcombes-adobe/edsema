/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-blog-article.js
  var import_blog_article_exports = {};
  __export(import_blog_article_exports, {
    default: () => import_blog_article_default
  });

  // tools/importer/parsers/columns-article.js
  function parse(element, { document }) {
    const gridChildren = element.querySelectorAll(":scope > div");
    const firstCol = gridChildren[0];
    const secondCol = gridChildren[1];
    const col1 = [];
    const col2 = [];
    const nbdImage = element.querySelector(":scope > img");
    const nbdOverlay = element.querySelector(":scope > .overlay, .nbd-article-banner-details");
    if (nbdImage || nbdOverlay) {
      if (nbdImage) {
        col1.push(nbdImage);
      } else {
        const img = element.querySelector("img");
        if (img) col1.push(img);
      }
      const details = element.querySelector(".nbd-article-banner-details") || nbdOverlay || element;
      const heading = details.querySelector('h1, h2, [class*="banner-title"]');
      if (heading) col2.push(heading);
      details.querySelectorAll('[class*="author"], [class*="date"], [class*="byline"], p').forEach((el) => {
        if (!col2.includes(el)) col2.push(el);
      });
    } else {
      if (firstCol) {
        const image = firstCol.querySelector("img.cover-image, img");
        if (image) col1.push(image);
      }
      if (secondCol) {
        Array.from(secondCol.children).forEach((child) => col2.push(child));
      }
    }
    const cells = [[col1, col2]];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-news.js
  function parse2(element, { document }) {
    let slides = element.querySelectorAll(".slick-slide:not(.slick-cloned)");
    if (!slides.length) {
      slides = element.querySelectorAll(
        ".swiper-slide:not(.swiper-slide-duplicate):not(.swiper-slide-duplicate-active):not(.swiper-slide-duplicate-next):not(.swiper-slide-duplicate-prev)"
      );
    }
    const cells = [];
    slides.forEach((slide) => {
      const img = slide.querySelector(".col-md-4 img.vertical-card-img.d-none.d-md-block") || slide.querySelector(".col-md-4 img.vertical-card-img") || slide.querySelector(".col-md-4 img") || slide.querySelector(".nbd-article-card-img img") || slide.querySelector(".card-header img") || slide.querySelector("img");
      const title = slide.querySelector(".card-content h3.news-title") || slide.querySelector(".card-content h3") || slide.querySelector(".nbd-article-card-heading h4") || slide.querySelector(".nbd-article-post-card-heading h4") || slide.querySelector("h3, h4");
      const description = slide.querySelector(".card-content p.news-desc") || slide.querySelector(".card-content p") || slide.querySelector(".nbd-article-card-content p") || slide.querySelector(".nbd-article-post-card-content p") || slide.querySelector("p");
      const link = slide.querySelector(".card-content a.inline-link") || slide.querySelector(".card-content a") || slide.querySelector(".nbd-article-card-Link a.articlelink") || slide.querySelector(".nbd-article-post-card-Link a.articlelink") || slide.querySelector("a.articlelink") || slide.querySelector("a[href]");
      const contentCell = [];
      if (title) contentCell.push(title);
      if (description) contentCell.push(description);
      if (link) contentCell.push(link);
      if (!img && !contentCell.length) return;
      const imageCell = img ? [img] : [""];
      cells.push([imageCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-news", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/nedbank-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [".cookiealert"]);
      WebImporter.DOMUtils.remove(element, [
        "#NBD_NEDBANK-NAVIGATION_1",
        ".nedbank-navigation",
        ".navigation",
        ".mobile-navigation",
        ".nbd-header-container",
        ".nbd-navbar-desktop-wrapper",
        ".nbd-social-share-wrapper",
        "#stickyheader",
        ".primarynav",
        "div.footer",
        "footer.page-footer"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#NBD_NEDBANK-NAVIGATION_1",
        ".nedbank-navigation",
        ".mobile-navigation",
        ".nbd-social-share-wrapper",
        "#stickyheader",
        "div.footer",
        "footer.page-footer"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "#destination_publishing_iframe_nedbank_0",
        "#ZN_3KxZKKjUdOy8PQW"
      ]);
      element.querySelectorAll('img[src*="t.co/"], img[src*="analytics.twitter.com"], img[src*="doubleclick"]').forEach((img) => img.remove());
      element.querySelectorAll('iframe[src*="doubleclick"], iframe[src*="demdex.net"], iframe[src*="fls."]').forEach((iframe) => iframe.remove());
      WebImporter.DOMUtils.remove(element, [
        "#domainproperty",
        "#loadonclick",
        "#domainName",
        "#homevariationinherited",
        "#hidedomainlinks"
      ]);
      WebImporter.DOMUtils.remove(element, ["link", "noscript"]);
    }
  }

  // tools/importer/transformers/nedbank-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.beforeTransform) {
      const { document } = payload;
      const sections = payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const reversedSections = [...sections].reverse();
      reversedSections.forEach((section, reverseIndex) => {
        const originalIndex = sections.length - 1 - reverseIndex;
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) return;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(sectionMetadata);
        }
        if (originalIndex > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      });
    }
  }

  // tools/importer/import-blog-article.js
  var parsers = {
    "columns-article": parse,
    "carousel-news": parse2
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "blog-article",
    description: "Nedbank blog article: hero banner (title/author/date over image), article body (default content), related-posts carousel",
    urls: [
      "https://personal.nedbank.co.za/learn/blog/5-reasons-not-to-withdraw-cash-from-a-credit-card.html"
    ],
    blocks: [
      {
        name: "columns-article",
        instances: [".nbd-article-banner-bg-img"]
      },
      {
        name: "carousel-news",
        instances: [".nbd-related-posts-wrapper"],
        section: "green"
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Banner",
        selector: ".nbd-article-banner-bg-img",
        style: null,
        blocks: ["columns-article"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Article Body",
        selector: ".cmp-text.customtext",
        style: null,
        blocks: [],
        defaultContent: [".cmp-text.customtext"]
      },
      {
        id: "section-3",
        name: "Related Posts",
        selector: ".nbd-related-posts-wrapper",
        style: "green",
        blocks: ["carousel-news"],
        defaultContent: [".nbd-related-posts-wrapper h2"]
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
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
            section: blockDef.section || null
          });
        });
      });
    });
    return pageBlocks;
  }
  var import_blog_article_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_blog_article_exports);
})();
