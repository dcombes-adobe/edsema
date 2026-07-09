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

  // tools/importer/import-product-detail-insurance.js
  var import_product_detail_insurance_exports = {};
  __export(import_product_detail_insurance_exports, {
    default: () => import_product_detail_insurance_default
  });

  // tools/importer/parsers/hero-product.js
  function parse(element, { document }) {
    const image = element.querySelector(".banner-bgimage picture, .nbd-banner-img picture, figure picture, .banner-bgimage img, .nbd-banner-img img, .nbd-img-banner img, figure img");
    const content = element.querySelector(".nbd-banner-details") || element;
    const heading = content.querySelector('h1, h2, h3, [class*="title"]');
    const intro = content.querySelector("p");
    const cta = content.querySelector("a.nbd-btn, a.btn, .nbd-banner-buttons a, a[href]");
    if (!heading && !intro && !image) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    if (image) cells.push([image]);
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (intro) contentCell.push(intro);
    if (cta) {
      cta.querySelectorAll("i").forEach((i) => i.remove());
      contentCell.push(cta);
    }
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-product", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-checklist.js
  function parse2(element, { document }) {
    const items = Array.from(element.querySelectorAll("ul > li"));
    if (!items.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    items.forEach((li) => {
      const icon = li.querySelector("picture, img") || li.querySelector("figure.nbd-icon-container, figure, em");
      const label = li.querySelector("span, p") || li;
      const iconCell = icon || "";
      const bodyCell = label || "";
      cells.push([iconCell, bodyCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-checklist", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-feature.js
  function parse3(element, { document }) {
    const textContent = element.querySelector(".text-content, .nbd-offset-content, .nbd-cobl-content-div");
    const heading = textContent ? textContent.querySelector("h3, h2, h1, .nbd-cobl-heading") : element.querySelector("h3, h2, h1, .nbd-cobl-heading");
    const descScope = textContent || element;
    const description = Array.from(
      descScope.querySelectorAll(".cobl-rtcontent-div p, .block-content p, p")
    ).find((p) => p.textContent.trim().length > 0);
    const ctaLink = element.querySelector('a.stripe-white-cta, a.nbd-cobl-anchor, a[class*="cta"], .block-content a, .nbd-anchor-div a');
    const image = element.querySelector(".image-container img, .nbd-offset-imageback img, .col-lg-6:first-child img, .col-lg-6:last-child img, img");
    const col1Content = [];
    if (heading) col1Content.push(heading);
    if (description) col1Content.push(description);
    if (ctaLink) col1Content.push(ctaLink);
    const col2Content = [];
    if (image) col2Content.push(image);
    const cells = [
      [col1Content, col2Content]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-cover.js
  function parse4(element, { document }) {
    const cards = Array.from(element.querySelectorAll(".card.nb-card, .nb-card"));
    if (!cards.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    cards.forEach((card) => {
      const icon = card.querySelector(".icon-wrapper picture, .icon-wrapper img, img.card-icon, picture, img");
      const title = card.querySelector('.card-body h4, h4, h3, [class*="title"]');
      const description = card.querySelector(".description p, .card-body .description, .description");
      const bodyCell = [];
      if (title) bodyCell.push(title);
      if (description) bodyCell.push(description);
      cells.push([icon || "", bodyCell.length ? bodyCell : ""]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-cover", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-steps.js
  function parse5(element, { document }) {
    const steps = Array.from(element.querySelectorAll(".nbd-step-card"));
    if (!steps.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    steps.forEach((step) => {
      const imgWrap = step.querySelector(".nbd-step-card-img");
      let icon = null;
      if (imgWrap) {
        const pic = imgWrap.querySelector("picture");
        const imgs = imgWrap.querySelectorAll("img");
        icon = pic || imgs[imgs.length - 1] || imgs[0] || null;
      }
      let title = step.querySelector(".nbd-step-card-heading h5, .nbd-step-card-heading");
      if (!title) {
        title = Array.from(step.querySelectorAll("h5, h4")).find((h) => !h.classList.contains("nbd-circle-step-text") && !h.closest(".nbd-circle-step, .nbd-mb-circle-step")) || null;
      }
      const descParas = Array.from(step.querySelectorAll(".nbd-step-card-content p")).filter((p) => p.textContent.trim().length);
      const bodyCell = [];
      if (title) bodyCell.push(title);
      bodyCell.push(...descParas);
      cells.push([icon || "", bodyCell.length ? bodyCell : ""]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-steps", cells });
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
        ".search-login",
        "#stickyheader",
        ".primarynav",
        '[id^="NBD_SOCIALSHARE_"]',
        '[id^="NBD_FOOTER_"]',
        '[id^="NBD_LISTPOPUP_"]',
        ".nbd-listpopup-container",
        "#logincomp",
        "#searchcomp",
        ".modal",
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
        ".search-login",
        "#stickyheader",
        '[id^="NBD_SOCIALSHARE_"]',
        '[id^="NBD_FOOTER_"]',
        '[id^="NBD_LISTPOPUP_"]',
        ".nbd-listpopup-container",
        "#logincomp",
        "#searchcomp",
        ".modal",
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

  // tools/importer/import-product-detail-insurance.js
  var parsers = {
    "hero-product": parse,
    "cards-checklist": parse2,
    "columns-feature": parse3,
    "cards-cover": parse4,
    "cards-steps": parse5
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "product-detail-insurance",
    description: "Nedbank insurance product page: hero with CTA, why-choose checklist, content split, cover-type icon cards, numbered claims process",
    urls: [
      "https://personal.nedbank.co.za/insure/business-cover.html"
    ],
    blocks: [
      { name: "hero-product", instances: ["#NBD_BANNER_1"] },
      { name: "cards-checklist", instances: ["#NBD_WHYCHOOSE_1"] },
      { name: "columns-feature", instances: ["#NBD_CONTENTBLOCK_1"] },
      { name: "cards-cover", instances: ["#NBD_ILLUSTRATIONCARD_1"] },
      { name: "cards-steps", instances: ["#NBD_APPLICATIONPROCESS_1"], section: "light-green" }
    ],
    sections: [
      { id: "section-1", name: "Hero", selector: "#NBD_BANNER_1", style: null, blocks: ["hero-product"], defaultContent: [] },
      { id: "section-2", name: "Why Choose", selector: "#NBD_WHYCHOOSE_1", style: null, blocks: ["cards-checklist"], defaultContent: ["#NBD_WHYCHOOSE_1 h2"] },
      { id: "section-3", name: "Content Split", selector: "#NBD_CONTENTBLOCK_1", style: null, blocks: ["columns-feature"], defaultContent: [] },
      { id: "section-4", name: "Cover Types", selector: "#NBD_ILLUSTRATIONCARD_1", style: null, blocks: ["cards-cover"], defaultContent: ["#NBD_ILLUSTRATIONCARD_1 h2"] },
      { id: "section-5", name: "Claims Process", selector: "#NBD_APPLICATIONPROCESS_1", style: "light-green", blocks: ["cards-steps"], defaultContent: ["#NBD_APPLICATIONPROCESS_1 h2"] }
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
  var import_product_detail_insurance_default = {
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
  return __toCommonJS(import_product_detail_insurance_exports);
})();
