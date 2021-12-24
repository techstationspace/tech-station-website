import React from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import { createClasses, getUrl } from "../utils/utils";

const Link = ({ blok }) => {
  blok.style = blok.style || blok.parentStyle.linkStyle;
  blok.type = blok.type || blok.parentType;
  blok.size = blok.size || blok.parentSize;

  const linkClasses = createClasses(blok, ["type", "style", "size"]);

  return (
    <SbEditable content={blok} key={blok._uid}>
      <a
        className={linkClasses.join(" ")}
        href={getUrl(blok.url)}
        target={blok.target ? "_blank" : null}
        rel={blok.target ? "noreferrer" : null}
      >
        {blok.text}
      </a>
    </SbEditable>
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
    type: PropTypes.oneOf(["filled", "text", "rounded"]),
    style: PropTypes.oneOf([
      "",
      "primary",
      "secondary",
      "service",
      "light",
      "dark",
    ]),
    size: PropTypes.oneOf(["default", "small", "medium", "large"]),
  }),
};

export default Link;
