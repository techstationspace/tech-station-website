require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    siteUrl: "https://techstationpadova.it/",
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
      resolve: "gatsby-plugin-cookiebot",
      options: {
        cookiebotId: process.env.GATSBY_COOKIE_BOT, // Required. Site's Cookiebot ID.
        manualMode: true, // Optional. Turns on Cookiebot's manual mode. Defaults to false.
        blockGtm: false, //  Optional. Skip blocking of GTM. Defaults to true if manualMode is set to true.
        includeInDevelopment: true, // Optional. Enables plugin in development. Will cause gatsby-plugin-google-tagmanager to thrown an error when pushing to dataLayer. Defaults to false.
        pluginDebug: false, // Optional. Debug mode for plugin development. Defaults to false.
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: process.env.GATSBY_GA,
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
