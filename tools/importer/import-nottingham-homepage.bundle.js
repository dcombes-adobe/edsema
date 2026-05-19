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

  // tools/importer/import-nottingham-homepage.js
  var import_nottingham_homepage_exports = {};
  __export(import_nottingham_homepage_exports, {
    default: () => import_nottingham_homepage_default
  });

  // tools/importer/parsers/hero-banner.js
  function parse(element, { document }) {
    const bgImage = element.querySelector(
      'img.desktop-banner-image, img.cover-image, img[class*="banner-image"]'
    );
    const heading = element.querySelector(
      "h1.banner-title, h2.h1-heading, .banner-content h1, .card-body h2, h1, h2"
    );
    const description = element.querySelector(
      "p.banner-text, p.subheading, .banner-content p, .card-body p"
    );
    const ctaLinks = Array.from(
      element.querySelectorAll(
        'a.stripe-white-cta, .button-group a, .banner-content a[href], a[class*="cta"]'
      )
    );
    const cells = [];
    if (bgImage) {
      cells.push([[bgImage]]);
    }
    const contentItems = [];
    if (heading) contentItems.push(heading);
    if (description) contentItems.push(description);
    contentItems.push(...ctaLinks);
    if (contentItems.length > 0) {
      cells.push([contentItems]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-search.js
  function parse2(element, { document }) {
    const heading = element.querySelector("h2.search-section-title, h1.search-section-title, h2, h1");
    const select = element.querySelector("select#cfinder-filter, select");
    const options = select ? Array.from(select.querySelectorAll("option")).map((opt) => opt.textContent.trim()).filter((text) => text && text !== "Select study level") : [];
    const button = element.querySelector("button#action, button.button--secondary, .search-submit button");
    const buttonText = button ? button.textContent.trim() : "Search";
    const label = element.querySelector("label.course-finder-label, .search-keyword label");
    const labelText = label ? label.textContent.trim() : "Search courses";
    const description = document.createElement("p");
    const studyLevels = options.length > 0 ? options.join(", ") : "Undergraduate, Postgraduate, Research";
    description.textContent = `Course finder: ${labelText}. Study levels: ${studyLevels}. Action: ${buttonText}`;
    const cells = [];
    if (heading) {
      cells.push([heading]);
    }
    cells.push([description]);
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-search", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-campaign.js
  function parse3(element, { document }) {
    const tiles = element.querySelectorAll('.campaign-tile, .tile-container > div[class*="tile"]');
    const cells = [];
    tiles.forEach((tile) => {
      const heading = tile.querySelector('h2.campaign-tile-title, h2, h3, [class*="tile-title"]');
      const description = tile.querySelector('p.campaign-tile-text, p, [class*="tile-text"]');
      const link = tile.querySelector(".campaign-tile-links a, a.inline-link, a");
      const cellContent = document.createElement("div");
      if (heading) cellContent.appendChild(heading);
      if (description) cellContent.appendChild(description);
      if (link) cellContent.appendChild(link);
      if (cellContent.childNodes.length > 0) {
        cells.push([cellContent]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-campaign", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-stats.js
  function parse4(element, { document }) {
    const tiles = element.querySelectorAll(".ranking-tile");
    const cells = [];
    tiles.forEach((tile) => {
      const rankingSpan = tile.querySelector(".ranking-title span");
      const descriptionStrong = tile.querySelector(".ranking-text p strong");
      const citationLink = tile.querySelector(".ranking-text a");
      const cellContent = [];
      if (rankingSpan) {
        const heading = document.createElement("h3");
        heading.textContent = rankingSpan.textContent.trim();
        cellContent.push(heading);
      }
      if (descriptionStrong) {
        const desc = document.createElement("p");
        desc.textContent = descriptionStrong.textContent.trim();
        cellContent.push(desc);
      }
      if (citationLink) {
        const link = document.createElement("a");
        link.href = citationLink.href;
        link.textContent = citationLink.textContent.trim();
        if (citationLink.title) {
          link.title = citationLink.title;
        }
        cellContent.push(link);
      }
      if (cellContent.length > 0) {
        cells.push(cellContent);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-stats", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-feature.js
  function parse5(element, { document }) {
    const textContent = element.querySelector(".text-content");
    const heading = textContent ? textContent.querySelector("h3, h2, h1") : element.querySelector("h3, h2, h1");
    const description = textContent ? textContent.querySelector("p") : element.querySelector(".block-content p");
    const ctaLink = element.querySelector('a.stripe-white-cta, a[class*="cta"], .block-content a');
    const image = element.querySelector(".image-container img, .col-lg-6:last-child img, img");
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

  // tools/importer/parsers/cards-image-cta.js
  function parse6(element, { document }) {
    const cards = element.querySelectorAll(".imageWhiteCTA-card");
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector("img.background-image");
      const link = card.querySelector("a.stripe-white-cta");
      const imageCell = [];
      if (img) {
        const newImg = document.createElement("img");
        newImg.src = img.src;
        newImg.alt = img.alt || "";
        imageCell.push(newImg);
      }
      const linkCell = [];
      if (link) {
        const newLink = document.createElement("a");
        newLink.href = link.href;
        newLink.textContent = link.textContent.trim();
        if (link.title) newLink.title = link.title;
        linkCell.push(newLink);
      }
      cells.push([imageCell, linkCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-image-cta", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-news.js
  function parse7(element, { document }) {
    const slides = element.querySelectorAll(".slick-slide:not(.slick-cloned)");
    const cells = [];
    slides.forEach((slide) => {
      const img = slide.querySelector(".col-md-4 img.vertical-card-img.d-none.d-md-block") || slide.querySelector(".col-md-4 img.vertical-card-img") || slide.querySelector(".col-md-4 img");
      const title = slide.querySelector(".card-content h3.news-title") || slide.querySelector(".card-content h3") || slide.querySelector("h3");
      const description = slide.querySelector(".card-content p.news-desc") || slide.querySelector(".card-content p") || slide.querySelector("p");
      const link = slide.querySelector(".card-content a.inline-link") || slide.querySelector(".card-content a") || slide.querySelector("a");
      const contentCell = [];
      if (title) contentCell.push(title);
      if (description) contentCell.push(description);
      if (link) contentCell.push(link);
      const imageCell = img ? [img] : [""];
      cells.push([imageCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-news", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse8(element, { document }) {
    const cells = [];
    const nottinghamCards = element.querySelectorAll(".vertical-card");
    if (nottinghamCards.length > 0) {
      nottinghamCards.forEach((card) => {
        const img = card.querySelector("img.vertical-card-img, .col-md-4 img");
        const contentCell = [];
        const dayEl = card.querySelector(".date .day");
        const monthEl = card.querySelector(".date .month");
        if (dayEl && monthEl) {
          const datePara = document.createElement("p");
          datePara.textContent = `${dayEl.textContent.trim()} ${monthEl.textContent.trim()}`;
          contentCell.push(datePara);
        }
        const heading = card.querySelector("h3.event-title, .card-content h3");
        if (heading) contentCell.push(heading);
        const link = card.querySelector("a.inline-link, .card-content a");
        if (link) contentCell.push(link);
        if (img || contentCell.length > 0) {
          cells.push([img || "", contentCell]);
        }
      });
    } else {
      const wkndCards = element.querySelectorAll("a.article-card, a.card-link");
      if (wkndCards.length === 0) return;
      wkndCards.forEach((card) => {
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
    }
    if (cells.length === 0) return;
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-logos.js
  function parse9(element, { document }) {
    const desktopContainer = element.querySelector(".d-none.d-md-inline");
    const logoImages = desktopContainer ? Array.from(desktopContainer.querySelectorAll("img.partner-icon")) : Array.from(element.querySelectorAll(".large-display-icons img.partner-icon"));
    const cells = [];
    if (logoImages.length > 0) {
      const row = logoImages.map((img) => img);
      cells.push(row);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-logos", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/nottingham-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk",
        ".onetrust-pc-dark-filter"
      ]);
      const form = element.querySelector("form#form1");
      if (form) {
        while (form.firstChild) {
          form.parentNode.insertBefore(form.firstChild, form);
        }
        form.remove();
      }
      WebImporter.DOMUtils.remove(element, [".aspNetHidden"]);
      WebImporter.DOMUtils.remove(element, [".flyout"]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".headerv2-component",
        "header.headerv2"
      ]);
      WebImporter.DOMUtils.remove(element, [".headerv2-skip-content-link"]);
      WebImporter.DOMUtils.remove(element, ["footer#footer", "footer"]);
      WebImporter.DOMUtils.remove(element, ["script", "noscript", "link"]);
    }
  }

  // tools/importer/transformers/nottingham-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
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

  // tools/importer/import-nottingham-homepage.js
  var parsers = {
    "hero-banner": parse,
    "hero-search": parse2,
    "cards-campaign": parse3,
    "cards-stats": parse4,
    "columns-feature": parse5,
    "cards-image-cta": parse6,
    "carousel-news": parse7,
    "cards-article": parse8,
    "columns-logos": parse9
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "nottingham-homepage",
    description: "University of Nottingham main homepage with hero, search, course finder, news, events, and campus highlights",
    urls: [
      "https://www.nottingham.ac.uk/"
    ],
    blocks: [
      {
        name: "hero-banner",
        instances: [".homepage-hero-banner"]
      },
      {
        name: "hero-search",
        instances: [".search-section"]
      },
      {
        name: "cards-campaign",
        instances: [".homepage-campaign-tiles"]
      },
      {
        name: "cards-stats",
        instances: [".homepage-rankings"]
      },
      {
        name: "columns-feature",
        instances: [".homepage-image-cta-block"]
      },
      {
        name: "cards-image-cta",
        instances: [".homepage-image-cta-row"]
      },
      {
        name: "carousel-news",
        instances: [".news-carousel"]
      },
      {
        name: "cards-article",
        instances: [".events-section .row.g-4"]
      },
      {
        name: "columns-logos",
        instances: [".homepage-partnerships"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero Banner",
        selector: ".homepage-hero-banner",
        style: null,
        blocks: ["hero-banner"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Course Finder",
        selector: ".search-section",
        style: null,
        blocks: ["hero-search"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Campaign Tiles",
        selector: ".homepage-campaign-tiles",
        style: null,
        blocks: ["cards-campaign"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Rankings",
        selector: ".homepage-rankings",
        style: "dark",
        blocks: ["cards-stats"],
        defaultContent: []
      },
      {
        id: "section-5",
        name: "Research",
        selector: ".homepage-bg-container",
        style: "grey",
        blocks: ["columns-feature", "cards-image-cta"],
        defaultContent: [".homepage-bg-container > .container > h2"]
      },
      {
        id: "section-6",
        name: "University News",
        selector: ".news-events",
        style: null,
        blocks: ["carousel-news"],
        defaultContent: [".news-events-title", ".news-events-all-link"]
      },
      {
        id: "section-7",
        name: "Featured Events",
        selector: ".events-section",
        style: null,
        blocks: ["cards-article"],
        defaultContent: [".news-events-title", ".news-events-all-link"]
      },
      {
        id: "section-8",
        name: "Partner Logos",
        selector: ".homepage-partnerships",
        style: null,
        blocks: ["columns-logos"],
        defaultContent: []
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
  var import_nottingham_homepage_default = {
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
  return __toCommonJS(import_nottingham_homepage_exports);
})();
