import React from "react";
import PropTypes from "prop-types";

const defaultLang = process.env.DEFAULT_LANG;

const Link = ({ blok }) => {
  let url = blok.url.cached_url;
  const isHome = url.includes("/home");
  const isDefaultLang = url.includes(defaultLang);
  const isInternal = blok.url.url === "";

  if (isInternal) {
    if (isHome) {
      url = url.replace("/home", "");
    }
    if (isDefaultLang) {
      url = url.replace(defaultLang, "");
    }
    url = `/${url}`;
  }

  return (
    <a
      className="link"
      href={url}
      target={blok.target ? "_blank" : null}
      rel={blok.target ? "noreferrer" : null}
    >
      {blok.text}
    </a>
  );
};

Link.defaultProps = {
  blok: {
    text: "link text",
    url: {
      cached_url: "#link",
    },
    target: false,
  },
};

Link.propTypes = {
  blok: PropTypes.shape({
    text: PropTypes.string,
    url: PropTypes.shape({
      cached_url: PropTypes.string,
    }).isRequired,
    target: PropTypes.bool,
    style: PropTypes.array,
  }),
};

export default Link;
