const path = require("path");

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

const defaultLanguage = process.env.DEFAULT_LANG;
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
  const { createPage } = actions;

  ////////////////////////////////////// QUERY HEADER, FOOTERS AND COACHES
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
    reporter.panicOnBuild(`Error while running GraphQL query headers.`);
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
    reporter.panicOnBuild(`Error while running GraphQL query footers.`);
    return;
  }
  const footers = queryFooters.data.allStoryblokEntry.edges;
  // console.log("footers", footers)

  const queryCoaches = await graphql(`
    query {
      allStoryblokEntry(filter: { field_component: { eq: "coach" } }) {
        edges {
          node {
            uuid
            content
          }
        }
      }
    }
  `);
  if (queryCoaches.error) {
    reporter.panicOnBuild(`Error while running GraphQL query coaches`);
    return;
  }
  const coaches = queryCoaches.data.allStoryblokEntry.edges;
  // console.log("coaches", coaches)

  ////////////////////////////////////// QUERY AND CREATE PAGES
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
  const pages = queryPages.data.allStoryblokEntry.edges;
  // console.log("pages", pages);

  const pageTemplate = path.resolve("./src/templates/pageTemplate.js");
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
    // console.log("page: ", page);
  });

  ////////////////////////////////////// QUERY AND CREATE PROJECTS
  const queryProjects = await graphql(`
    query {
      allStoryblokEntry(filter: { field_component: { eq: "project" } }) {
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
  if (queryProjects.error) {
    reporter.panicOnBuild(`Error while running GraphQL query projects`);
    return;
  }
  const projects = queryProjects.data.allStoryblokEntry.edges;
  // console.log("projects", projects);

  const projectTemplate = path.resolve("./src/templates/projectTemplate.js");
  projects.forEach((entry) => {
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

    const project = {
      path: path,
      component: projectTemplate,
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
    createPage(project);
    // console.log("project: ", project);
  });

  ////////////////////////////////////// QUERY AND CREATE COURSES
  const queryCourses = await graphql(`
    query {
      allStoryblokEntry(filter: { field_component: { eq: "course" } }) {
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
  if (queryCourses.error) {
    reporter.panicOnBuild(`Error while running GraphQL query courses`);
    return;
  }
  const courses = queryCourses.data.allStoryblokEntry.edges;
  // console.log("courses", courses);

  const courseTemplate = path.resolve("./src/templates/courseTemplate.js");
  courses.forEach((entry) => {
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

    const course = {
      path: path,
      component: courseTemplate,
      context: {
        story: data,
        // settings: {
        //   languages: {
        //     current: language,
        //     list: languages,
        //   },
        //   header: header,
        //   footer: footer,
        // },
      },
    };
    createPage(course);
    // console.log("course: ", course);
  });
};
