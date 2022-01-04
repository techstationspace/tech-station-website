import React from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import { createClasses } from "../utils/utils";

const Heading = ({ blok, parent }) => {
  const Tags = {};
  switch (blok.relevance) {
    case "main":
      Tags.title = "h1";
      Tags.subtitle = "h4";
      break;
    case "high":
      Tags.title = "h2";
      Tags.subtitle = "h5";
      break;
    case "low":
      Tags.title = "h3";
      Tags.subtitle = "h6";
      break;
    default:
      Tags.title = "p";
      Tags.subtitle = "p";
      break;
  }

  const parentProps = parent?.heading || {};
  blok.style = blok.style || parentProps?.style;
  const headingClasses = createClasses(blok, ["style"]);

  return (
    <SbEditable content={blok} key={blok._uid}>
      <div className={headingClasses.join(" ")}>
        {!!blok.title && (
          <Tags.title className="heading--title">{blok.title}</Tags.title>
        )}
        {!!blok.subtitle && (
          <Tags.subtitle className="heading--subtitle">
            {blok.subtitle}
          </Tags.subtitle>
        )}
      </div>
    </SbEditable>
  );
};

Heading.propTypes = {
  parent: PropTypes.shape({
    heading: PropTypes.shape({
      style: PropTypes.string,
    }),
  }),
  blok: PropTypes.shape({
    title: PropTypes.string,
    subtitle: PropTypes.string,
    relevance: PropTypes.oneOf(["main", "high", "low"]),
  }),
};

export default Heading;
