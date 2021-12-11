require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    siteUrl: "https://www.yourdomain.tld",
    title: "tech-station-website",
  },
  plugins: [
    "gatsby-plugin-sass",
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "XXXXXX",
      },
    },
    {
      resolve: "gatsby-source-storyblok",
      options: {
        accessToken: process.env.STORY_BLOK,
        version: process.env.NODE_ENV === "production" ? "published" : "draft",
        // Optional parameter. Omission will retrieve all languages by default.
        languages: ["it", "en"],
      },
    },
    /*
    {
      resolve: "gatsby-plugin-mailchimp",
      options: {
        // string; add your MC list endpoint here; see instructions below
        endpoint: process.env.MAIL_CHIMP,
        timeout: 3500,
      },
    },
    */
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
