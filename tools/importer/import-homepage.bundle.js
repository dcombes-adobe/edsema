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

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-landing.js
  function parse(element, { document }) {
    const images = Array.from(
      element.querySelectorAll(".grid-layout.grid-gap-xs img.cover-image, .grid-layout.grid-gap-xs img")
    );
    const heading = element.querySelector("h1, .h1-heading");
    const subheading = element.querySelector("p.subheading, .subheading");
    const ctaLinks = Array.from(element.querySelectorAll(".button-group a.button, .button-group a"));
    const cells = [];
    if (images.length > 0) {
      cells.push(images);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (subheading) contentCell.push(subheading);
    contentCell.push(...ctaLinks);
    if (contentCell.length > 0) {
      cells.push(contentCell);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-landing", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-banner.js
  function parse2(element, { document }) {
    const bgImage = element.querySelector("img.cover-image.utility-overlay, img.cover-image");
    const cardBody = element.querySelector(".card-body");
    const heading = cardBody ? cardBody.querySelector("h2, .h1-heading") : element.querySelector("h2, .h1-heading");
    const description = cardBody ? cardBody.querySelector("p.subheading, p") : element.querySelector("p.subheading, p");
    const ctaLinks = Array.from(
      cardBody ? cardBody.querySelectorAll(".button-group a") : element.querySelectorAll(".button-group a")
    );
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    contentCell.push(...ctaLinks);
    if (contentCell.length > 0) {
      cells.push(contentCell);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-article.js
  function parse3(element, { document }) {
    const gridChildren = element.querySelectorAll(":scope > div");
    const firstCol = gridChildren[0];
    const secondCol = gridChildren[1];
    const col1 = [];
    if (firstCol) {
      const image = firstCol.querySelector("img.cover-image, img");
      if (image) col1.push(image);
    }
    const col2 = [];
    if (secondCol) {
      Array.from(secondCol.children).forEach((child) => col2.push(child));
    }
    const cells = [[col1, col2]];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-faq.js
  function parse4(element, { document }) {
    const faqList = element.querySelector(".faq-list, details.faq-item");
    if (!faqList) return;
    const gridChildren = element.querySelectorAll(":scope > div");
    const firstCol = gridChildren[0];
    const secondCol = gridChildren[1];
    const col1 = [];
    if (firstCol) {
      Array.from(firstCol.children).forEach((child) => col1.push(child));
    }
    const col2 = [];
    if (secondCol) {
      const faqItems = secondCol.querySelectorAll("details.faq-item, details");
      if (faqItems.length > 0) {
        faqItems.forEach((item) => col2.push(item));
      } else {
        Array.from(secondCol.children).forEach((child) => col2.push(child));
      }
    }
    const cells = [[col1, col2]];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse5(element, { document }) {
    if (element.querySelector(".article-card, .article-card-body")) return;
    const imageContainers = element.querySelectorAll(".utility-aspect-1x1, :scope > div");
    const cells = [];
    imageContainers.forEach((container) => {
      const img = container.querySelector("img.cover-image, img");
      if (img) {
        cells.push([img]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse6(element, { document }) {
    const cards = element.querySelectorAll("a.article-card, a.card-link");
    if (cards.length === 0) return;
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector(".article-card-image img, img");
      const contentCell = [];
      const tag = card.querySelector(".tag, .article-card-meta span.tag");
      if (tag) contentCell.push(tag);
      const date = card.querySelector(".article-card-meta .paragraph-sm, .article-card-meta span.utility-text-secondary");
      if (date) contentCell.push(date);
      const heading = card.querySelector("h3, .h4-heading");
      if (heading) contentCell.push(heading);
      const href = card.getAttribute("href");
      if (href) {
        const link = document.createElement("a");
        link.href = href;
        link.textContent = heading ? heading.textContent.trim() : "Read more";
        contentCell.push(link);
      }
      if (img) {
        cells.push([img, contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/tabs-testimonial.js
  function parse7(element, { document }) {
    const tabPanes = element.querySelectorAll(".tab-pane");
    const tabButtons = element.querySelectorAll("button.tab-menu-link, .tab-menu-link");
    const cells = [];
    tabPanes.forEach((pane, index) => {
      let label = `Tab ${index + 1}`;
      if (tabButtons[index]) {
        const nameEl = tabButtons[index].querySelector("strong");
        if (nameEl) label = nameEl.textContent.trim();
      }
      const contentCell = [];
      const gridLayout = pane.querySelector(".grid-layout");
      if (gridLayout) {
        const gridCols = gridLayout.querySelectorAll(":scope > div");
        if (gridCols[0]) {
          const img = gridCols[0].querySelector("img");
          if (img) contentCell.push(img);
        }
        if (gridCols[1]) {
          Array.from(gridCols[1].children).forEach((child) => contentCell.push(child));
        }
      }
      cells.push([label, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "tabs-testimonial", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-trendsetters-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, ["a.skip-link"]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [".navbar", "footer.footer", "link", "noscript"]);
    }
  }

  // tools/importer/transformers/wknd-trendsetters-sections.js
  function transform2(hookName, element, payload) {
    if (hookName === "afterTransform") {
      const sections = payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const document = element.ownerDocument;
      const mainEl = element.querySelector("main") || element;
      const sectionEls = Array.from(
        mainEl.querySelectorAll(":scope > header.section, :scope > section.section")
      );
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        let sectionEl = sectionEls[i];
        if (!sectionEl) {
          const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
          for (const sel of selectors) {
            sectionEl = mainEl.querySelector(sel) || element.querySelector(sel) || document.querySelector(sel);
            if (sectionEl) break;
          }
        }
        if (!sectionEl) continue;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.append(metaBlock);
        }
        if (i > 0) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-landing": parse,
    "hero-banner": parse2,
    "columns-article": parse3,
    "columns-faq": parse4,
    "cards-gallery": parse5,
    "cards-article": parse6,
    "tabs-testimonial": parse7
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    urls: [
      "https://wknd-trendsetters.site"
    ],
    description: "Homepage template for WKND Trendsetters site",
    blocks: [
      {
        name: "hero-landing",
        instances: ["header.section.secondary-section"]
      },
      {
        name: "columns-article",
        instances: ["main > section.section:nth-of-type(1) .grid-layout.grid-gap-lg"]
      },
      {
        name: "cards-gallery",
        instances: [".grid-layout.desktop-4-column.grid-gap-sm"]
      },
      {
        name: "tabs-testimonial",
        instances: [".tabs-wrapper"]
      },
      {
        name: "cards-article",
        instances: [".grid-layout.desktop-4-column.grid-gap-md"]
      },
      {
        name: "columns-faq",
        instances: [".grid-layout.grid-gap-xxl"]
      },
      {
        name: "hero-banner",
        instances: ["section.inverse-section .utility-position-relative"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "header.section.secondary-section",
        style: "light-grey",
        blocks: ["hero-landing"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Article Feature",
        selector: "main > section.section:nth-of-type(1)",
        style: null,
        blocks: ["columns-article"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Image Gallery",
        selector: "main > section.section.secondary-section:nth-of-type(1)",
        style: "light-grey",
        blocks: ["cards-gallery"],
        defaultContent: [".utility-text-align-center h2", ".utility-text-align-center p"]
      },
      {
        id: "section-4",
        name: "Testimonials",
        selector: "main > section.section:nth-of-type(3)",
        style: null,
        blocks: ["tabs-testimonial"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Latest Articles",
        selector: "main > section.section.secondary-section:nth-of-type(2)",
        style: "light-grey",
        blocks: ["cards-article"],
        defaultContent: [".utility-text-align-center h2", ".utility-text-align-center p"]
      },
      {
        id: "section-6",
        name: "FAQ",
        selector: "main > section.section:nth-of-type(5)",
        style: null,
        blocks: ["columns-faq"],
        defaultContent: []
      },
      {
        id: "section-7",
        name: "CTA Banner",
        selector: "section.section.inverse-section",
        style: "dark",
        blocks: ["hero-banner"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    transform2
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
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
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
  return __toCommonJS(import_homepage_exports);
})();
