import React from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";

const Seo = ({ meta, slug, language }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
            lang
            title
            description
          }
        }
      }
    `
  );
  let title = site.siteMetadata?.title;
  let description = site.siteMetadata?.description;
  const metaTags = [];
  const tags =
    meta.length &&
    meta.map(({ type, text, image }) => {
      switch (type) {
        case "title":
          title = text;
          return [
            { name: "og:title", content: text },
            { name: "twitter:title", content: text },
          ];
        case "description":
          description = text;
          return [
            { name: "og:description", content: text },
            { name: "twitter:description", content: text },
          ];
        case "image":
          return [{ name: `og:${type}`, content: image.filename }];
        default:
          return [];
      }
    });
  tags.length && metaTags.push(tags.flat());
  metaTags.push([
    { name: "og:url", content: `${site.siteMetadata?.siteUrl}/${slug}` },
    { name: `og:type`, content: `website` },
  ]);

  return (
    <Helmet
      htmlAttributes={{
        lang: language || site.siteMetadata?.lang,
      }}
      defer={false}
      title={title}
      meta={metaTags.flat().concat()}
    >
      <link rel="canonical" href={`${site.siteMetadata?.siteUrl}/${slug}`} />
      <meta name="description" content={description} />
    </Helmet>
  );
};

export default Seo;
