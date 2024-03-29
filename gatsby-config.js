require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    siteUrl: "https://techstationpadova.it/",
    lang: "it",
    title: "Techstation padova",
    description:
      "Associazione culturale, Promuoviamo la cultura digitale per rivoluzionare il mondo del lavoro.",
  },
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-google-tagmanager",
      options: {
        id: process.env.GATSBY_GTM,
        includeInDevelopment: true,
      },
    },
    {
      resolve: "gatsby-source-storyblok",
      options: {
        accessToken: process.env.GATSBY_STORY_BLOK,
        version: process.env.NODE_ENV === "production" ? "published" : "draft",
        homeSlug: "home",
      },
    },
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        // string; add your MC list endpoint here; see instructions below
        endpoint: process.env.GATSBY_MAIL_CHIMP,
        timeout: 3500,
      },
    },
    {
      resolve: "gatsby-plugin-social9-socialshare",
      options: {
        content: "9cc2c1782dbe4c09b68e3c5a86d72dd1",
        async: true,
        defer: true,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-mdx",
    "gatsby-transformer-remark",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
  ],
};
