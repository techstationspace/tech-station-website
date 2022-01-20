const path = require("path");
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const defaultLanguage = process.env.GATSBY_DEFAULT_LANG;
const languages = [defaultLanguage];
const indexPage = "home";

function pagePath(slug) {
  let path;
  path = slug.replace(indexPage, "");
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
  const { createPage, createRedirect } = actions;

  const queryStories = await graphql(`
    query {
      headers: allStoryblokEntry(
        filter: { field_component: { eq: "header" } }
      ) {
        edges {
          node {
            uuid
            field_component
            full_slug
            content
          }
        }
      }
      footers: allStoryblokEntry(
        filter: { field_component: { eq: "footer" } }
      ) {
        edges {
          node {
            uuid
            field_component
            full_slug
            content
          }
        }
      }
      pages: allStoryblokEntry(filter: { field_component: { eq: "page" } }) {
        edges {
          node {
            slug
            uuid
            field_component
            full_slug
            content
          }
        }
      }
      projects: allStoryblokEntry(
        filter: { field_component: { eq: "project" } }
      ) {
        edges {
          node {
            slug
            uuid
            field_component
            full_slug
            content
          }
        }
      }
      courses: allStoryblokEntry(
        filter: { field_component: { eq: "course" } }
      ) {
        edges {
          node {
            slug
            uuid
            field_component
            full_slug
            content
          }
        }
      }
    }
  `);
  if (queryStories.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query stories.`);
    return;
  }
  // console.log(queryStories.data);

  const stories = {
    header: queryStories.data.headers.edges,
    footer: queryStories.data.footers.edges,
    page: queryStories.data.pages.edges,
    project: queryStories.data.projects.edges,
    course: queryStories.data.courses.edges,
  };

  const templates = {
    page: path.resolve("./src/templates/pageTemplate.js"),
    project: path.resolve("./src/templates/projectTemplate.js"),
    course: path.resolve("./src/templates/courseTemplate.js"),
  };

  Object.keys(templates).map((key) => {
    const template = templates[key];

    stories[key].forEach((story) => {
      const data = story.node;
      const path = pagePath(data.full_slug);
      const language = detectLanguage(data.full_slug);
      const content = JSON.parse(data.content);

      const header = stories.header.find(
        ({ node }) => node.uuid === content.header
      );
      const footer = stories.footer.find(
        ({ node }) => node.uuid === content.footer
      );

      const page = {
        path: path,
        component: template,
        context: {
          story: data,
          settings: {
            header: header,
            footer: footer,
            languages: {
              default: defaultLanguage,
              current: language,
              list: languages,
            },
          },
        },
      };
      if (key === "page" && typeof header === "object") {
        createPage(page);
        return console.log(`create page: ${path}`);
      }
    });
  });

  const redirects = [
    {
      from: "/techstation-press/",
      to: "/chi-siamo",
    },
    {
      from: "/diventa-un-ambassador/",
      to: "/chi-siamo",
    },
    {
      from: "/coding-school/",
      to: "/progetti",
    },
    {
      from: "/coding-school-online/",
      to: "/progetti",
    },
  ];

  redirects.length &&
    redirects.map((redirect) => {
      if (
        typeof redirect.from === "string" &&
        typeof redirect.to === "string"
      ) {
        createRedirect({
          fromPath: redirect.from,
          toPath: redirect.to,
        });
      }
      return console.log(`redirect: ${redirect.from} => ${redirect.to})`);
    });
};
