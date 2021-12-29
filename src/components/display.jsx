import React from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import DynamicComponent from "../utils/dynamicComponent";
import { createClasses } from "../utils/utils";

const Display = ({ blok, children }) => {
  const childs = !!blok.body ? blok.body.length - 1 : 0;
  const body =
    blok.body &&
    blok.body.map((childBlok) => {
      childBlok.parentStyle = blok.parentStyle;
      return <DynamicComponent blok={childBlok} key={childBlok._uid} />;
    });

  const displayClasses = createClasses(blok, ["direction", "align", "justify"]);

  const gaps = {
    default: "1.25rem",
    small: ".75rem",
    mid: "1.75rem",
    large: "3rem",
  };

  const sizes = {
    quarter: "25%",
    oneThird: "33.3333%",
    half: "50%",
    full: "100%",
  };

  const displayStyles = {};
  const { gap, size } = blok;

  if (!!size) {
    displayStyles.width = `calc(${sizes[size]} - ${
      gaps[gap || "default"]
    } * ${childs})`;
    displayClasses.push("__sized");
  }
  displayStyles.gap = gaps[gap || "default"];

  return (
    <SbEditable content={blok} key={blok._uid}>
      <div className={displayClasses.join(" ")} style={displayStyles}>
        {children || body}
      </div>
    </SbEditable>
  );
};

Display.propTypes = {
  blok: PropTypes.shape({
    body: PropTypes.array,
    direction: PropTypes.oneOf(["", "row", "col"]),
    align: PropTypes.oneOf(["", "start", "center", "end", "stretch"]),
    justify: PropTypes.oneOf(["", "start", "center", "end", "stretch"]),
    gap: PropTypes.oneOf(["", "small", "mid", "large"]),
    size: PropTypes.oneOf(["", "quarter", "oneThird", "half", "full"]),
  }),
};

export default Display;
