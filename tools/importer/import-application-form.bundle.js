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

  // tools/importer/import-application-form.js
  var import_application_form_exports = {};
  __export(import_application_form_exports, {
    default: () => import_application_form_default
  });

  // tools/importer/parsers/cards-info.js
  function parse(element, { document }) {
    const cards = Array.from(element.querySelectorAll(".card.nb-card, .card"));
    if (!cards.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    cards.forEach((card) => {
      const icon = card.querySelector("img.card-icon") || card.querySelector("picture, img");
      const text = card.querySelector("p.card-text") || card.querySelector("p");
      const iconCell = icon || "";
      const bodyCell = text || "";
      cells.push([iconCell, bodyCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-info", cells });
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

  // tools/importer/parsers/cards-cta.js
  function parse3(element, { document }) {
    const cards = Array.from(element.querySelectorAll(".row.nb-row .card, .card"));
    if (!cards.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    cards.forEach((card) => {
      const title = card.querySelector(".card-text") || card.querySelector("h2, h3, h4, h5, p");
      const sourceLink = card.querySelector("a.card-link[href], a[href]");
      let linkCell = "";
      if (sourceLink) {
        const link = document.createElement("a");
        link.href = sourceLink.getAttribute("href");
        link.textContent = title && title.textContent.trim() || sourceLink.getAttribute("href");
        linkCell = link;
      }
      const titleCell = title || "";
      cells.push([titleCell, linkCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-cta", cells });
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

  // tools/importer/import-application-form.js
  var parsers = {
    "cards-info": parse,
    "cards-checklist": parse2,
    "cards-cta": parse3
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "application-form",
    description: "Nedbank ready-to-apply application page: things-to-know info cards, documents checklist, ways-to-open CTA cards, footer notes",
    urls: [
      "https://personal.nedbank.co.za/save-and-invest/accounts/in-24hrs/justinvest/ready-to-apply.html"
    ],
    blocks: [
      { name: "cards-info", instances: ["#NBD_ELIGIBILITYNEEDS_1 .eligibility .qualify-list"] },
      { name: "cards-checklist", instances: ["#NBD_ELIGIBILITYNEEDS_1 .eligibility .doclist"] },
      { name: "cards-cta", instances: ["#NBD_ELIGIBILITYCHANNELS_1 .channel"] }
    ],
    sections: [
      { id: "section-1", name: "Things to Know", selector: "#NBD_ELIGIBILITYNEEDS_1", style: null, blocks: ["cards-info", "cards-checklist"], defaultContent: ["#NBD_ELIGIBILITYNEEDS_1 h2"] },
      { id: "section-2", name: "Ways to Open", selector: "#NBD_ELIGIBILITYCHANNELS_1", style: null, blocks: ["cards-cta"], defaultContent: ["#NBD_ELIGIBILITYCHANNELS_1 h2"] },
      { id: "section-3", name: "Footer Notes", selector: "#NBD_TEXT_1", style: null, blocks: [], defaultContent: ["#NBD_TEXT_1 .cmp-text.customtext"] }
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
  var import_application_form_default = {
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
  return __toCommonJS(import_application_form_exports);
})();
