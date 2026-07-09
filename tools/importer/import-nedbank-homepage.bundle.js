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

  // tools/importer/import-nedbank-homepage.js
  var import_nedbank_homepage_exports = {};
  __export(import_nedbank_homepage_exports, {
    default: () => import_nedbank_homepage_default
  });

  // tools/importer/parsers/hero-video-banner.js
  function parse(element, { document }) {
    const bgImage = element.querySelector(".nbd-vbanner-bg-img img, picture img, img");
    const heading = element.querySelector(".nbd-vbanner-overlay h1, header h1, h1");
    const primaryCta = element.querySelector(".nbd-vbanner-buttons a, a.nbd-banner-btn, a.nbd-btn-primary");
    const subheading = element.querySelector(".nbd-vbanner-overlay2 h3, .nbd-vbanner-textblock h3, h3");
    const paragraph = element.querySelector(".nbd-vbanner-overlay2 p, .nbd-vbanner-textblock p");
    if (!heading && !paragraph && !bgImage) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (primaryCta) contentCell.push(primaryCta);
    if (subheading) contentCell.push(subheading);
    if (paragraph) contentCell.push(paragraph);
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-video-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-overview.js
  function parse2(element, { document }) {
    const cards = Array.from(element.querySelectorAll(".nbd-vcard-card, .card"));
    if (!cards.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    cards.forEach((card) => {
      const icon = card.querySelector(".nbd-intercept-img-bg img[alt], .card-header img:last-of-type, img");
      const title = card.querySelector(".nbd-vcard-card-body h5, .card-body h5, h5, h4, h3");
      const subtitle = card.querySelector(".nbd-vcard-card-body p, .card-body p, p");
      const link = card.querySelector(".nbd-vcard-footer a, .card-footer a, a[href]");
      const imageCell = [];
      if (icon) imageCell.push(icon);
      const bodyCell = [];
      if (title) bodyCell.push(title);
      if (subtitle) bodyCell.push(subtitle);
      if (link) bodyCell.push(link);
      cells.push([imageCell, bodyCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-overview", cells });
    const heading = element.querySelector("h1, h2, h3");
    if (heading) {
      element.replaceWith(heading, block);
    } else {
      element.replaceWith(block);
    }
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

  // tools/importer/parsers/cards-promo.js
  function parse4(element, { document }) {
    const cards = Array.from(element.querySelectorAll(".nbd-promoc-card, .card"));
    if (!cards.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    cards.forEach((card) => {
      const image = card.querySelector(".nbd-promoc-img, .card-img-top, img");
      const title = card.querySelector(".card-title, .card-body h4, h4, h3");
      const description = Array.from(card.querySelectorAll(".card-body p, .nbd-promoc-body p, p")).find((p) => p.textContent.trim().length > 0);
      const cta = card.querySelector(".card-footer a, a.stretched-link, a[href]");
      const imageCell = [];
      if (image) imageCell.push(image);
      const bodyCell = [];
      if (title) bodyCell.push(title);
      if (description) bodyCell.push(description);
      if (cta) bodyCell.push(cta);
      cells.push([imageCell, bodyCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-help.js
  function parse5(element, { document }) {
    const cells = [];
    const helpCards = Array.from(element.querySelectorAll(".nbd-switchcard-card"));
    helpCards.forEach((card) => {
      const icon = card.querySelector(".nbd-switchcard-img-bg img, .card-body img, img");
      const title = card.querySelector(".nbd-switchcard-card-info, .card-body h4, h4, h3");
      const description = card.querySelector(".nbd-switchcard-card-desc, .card-body p, p");
      const links = Array.from(card.querySelectorAll(".card-footer a, .nbd-switchcard-card-link, a[href]"));
      const imageCell = [];
      if (icon) imageCell.push(icon);
      const bodyCell = [];
      if (title) bodyCell.push(title);
      if (description) bodyCell.push(description);
      bodyCell.push(...links);
      cells.push([imageCell, bodyCell]);
    });
    const switchTitle = element.querySelector(".nbd-switchcard-title");
    const switchDesc = element.querySelector(".nbd-switchcard-desc");
    const switchCta = element.querySelector(".nbd-switchcard-btn a, a#rtaCTA, a.nbd-btn-secondary");
    if (switchTitle || switchDesc || switchCta) {
      const panelBody = [];
      if (switchTitle) panelBody.push(switchTitle);
      if (switchDesc) panelBody.push(switchDesc);
      if (switchCta) panelBody.push(switchCta);
      cells.push(["", panelBody]);
    }
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-help", cells });
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

  // tools/importer/import-nedbank-homepage.js
  var parsers = {
    "hero-video-banner": parse,
    "cards-overview": parse2,
    "columns-feature": parse3,
    "cards-promo": parse4,
    "cards-help": parse5
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "nedbank-homepage",
    description: "Nedbank Personal homepage (category-landing): hero video banner, overview icon-card grid, content block, promotions cards, switch CTA card, text block",
    urls: [
      "https://personal.nedbank.co.za/"
    ],
    blocks: [
      {
        name: "hero-video-banner",
        instances: ["#NBD_VIDEOBANNER_1"]
      },
      {
        name: "cards-overview",
        instances: ["#NBD_OVERVIEWCARDS_1"]
      },
      {
        name: "columns-feature",
        instances: ["#NBD_CONTENTBLOCK_1"]
      },
      {
        name: "cards-promo",
        instances: ["#NBD_PROMOTIONCARDS_1"]
      },
      {
        name: "cards-help",
        instances: ["#NBD_SWITCHCARD_1"],
        section: "green"
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Video Banner",
        selector: "#NBD_VIDEOBANNER_1",
        style: "light-green",
        blocks: ["hero-video-banner"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Overview Cards",
        selector: "#NBD_OVERVIEWCARDS_1",
        style: "light-green",
        blocks: ["cards-overview"],
        defaultContent: ["#NBD_OVERVIEWCARDS_1 h2"]
      },
      {
        id: "section-3",
        name: "Content Block",
        selector: "#NBD_CONTENTBLOCK_1",
        style: null,
        blocks: ["columns-feature"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Promotion Cards",
        selector: "#NBD_PROMOTIONCARDS_1",
        style: null,
        blocks: ["cards-promo"],
        defaultContent: ["#NBD_PROMOTIONCARDS_1 .nbd-promoc-heading"]
      },
      {
        id: "section-5",
        name: "Switch Card",
        selector: "#NBD_SWITCHCARD_1",
        style: "green",
        blocks: ["cards-help"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Text Block",
        selector: "#NBD_TEXT_1",
        style: null,
        blocks: [],
        defaultContent: ["#NBD_TEXT_1 h4", "#NBD_TEXT_1 p"]
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
  var import_nedbank_homepage_default = {
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
  return __toCommonJS(import_nedbank_homepage_exports);
})();
