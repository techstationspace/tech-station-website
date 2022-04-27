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
  const metaTags = [];
  const tags =
    meta.length &&
    meta.map(({ type, text, image }) => {
      switch (type) {
        case "title":
          title = text;
          return [
            { name: `og:${type}`, content: text },
            { name: `twitter:${type}`, content: text },
          ];
        case "description":
          return [
            { name: type, content: text },
            { name: `og:${type}`, content: text },
            { name: `twitter:${type}`, content: text },
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
    </Helmet>
  );
};

export default Seo;
