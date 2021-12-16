const path = require("path");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const defaultLanguage = process.env.DEFAULT_LANG;
const languages = [defaultLanguage];
const indexPage = "home";

function pagePath(slug) {
  let path;
  path = slug.replace(defaultLanguage, "");
  path = path.replace(indexPage, "");
  path = path.length ? path : "/";
  return path;
}

function detectLanguage(slug) {
  const pageLang = slug.split("/")[0];
  const isLang = !!pageLang && pageLang.length <= 2;
  const isUnique = !!pageLang && !languages.find((lang) => lang === pageLang);
  !!isLang && isUnique && languages.push(pageLang);
  return isLang ? pageLang : defaultLanguage;
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const queryHeaders = await graphql(`
    query {
      allStoryblokEntry(filter: { field_component: { eq: "header" } }) {
        edges {
          node {
            uuid
            content
          }
        }
      }
    }
  `);
  if (queryHeaders.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query pages.`);
    return;
  }
  const headers = queryHeaders.data.allStoryblokEntry.edges;
  // console.log("headers", headers)

  const queryFooters = await graphql(`
    query {
      allStoryblokEntry(filter: { field_component: { eq: "footer" } }) {
        edges {
          node {
            uuid
            content
          }
        }
      }
    }
  `);
  if (queryFooters.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query pages.`);
    return;
  }
  const footers = queryFooters.data.allStoryblokEntry.edges;
  // console.log("footers", footers)

  const queryPages = await graphql(`
    query {
      allStoryblokEntry(filter: { field_component: { eq: "page" } }) {
        edges {
          node {
            name
            id
            full_slug
            content
          }
        }
      }
    }
  `);
  if (queryPages.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query pages.`);
    return;
  }

  const pageTemplate = path.resolve("./src/templates/pageTemplate.js");
  const pages = queryPages.data.allStoryblokEntry.edges;
  // console.log("pages", pages);

  pages.forEach((entry) => {
    const data = entry.node;
    const path = pagePath(data.full_slug);
    const language = detectLanguage(data.full_slug);
    const content = JSON.parse(data.content);

    const header = headers.find(
      (header) => header.node.uuid === content.header
    );
    const footer = footers.find(
      (footer) => footer.node.uuid === content.footer
    );

    const page = {
      path: path,
      component: pageTemplate,
      context: {
        story: data,
        settings: {
          languages: {
            current: language,
            list: languages,
          },
          header: header,
          footer: footer,
        },
      },
    };
    createPage(page);
  });
};
