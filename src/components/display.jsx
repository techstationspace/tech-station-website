import React from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import DynamicComponent from "../utils/dynamicComponent";
import { createClasses, gaps, widths } from "../utils/utils";

const Display = ({ blok, parent, children }) => {
  const childs = !!blok.body ? blok.body.length - 1 : 0;

  const bodyProps = parent || {};
  if (blok.type === "card") {
    bodyProps.action.size = "small";
  }

  const body =
    blok.body &&
    blok.body.map((childBlok) => {
      return (
        <DynamicComponent
          blok={childBlok}
          parent={{ ...bodyProps }}
          key={childBlok._uid}
        />
      );
    });

  const displayClasses = createClasses(blok, ["align", "justify", "type"]);

  const parentProps = parent?.display || {};

  const displayStyles = {};
  const displaySize = blok.size || parentProps.size;
  const displayGap = blok.gap || parentProps.gap || "default";
  const gapAmount = `${gaps[displayGap || "default"]} * ${childs}`;

  if (!!displaySize) {
    displayStyles.width = `calc(${widths[displaySize]} - (${gapAmount}))`;
    displayClasses.push("__sized");
  }
  displayStyles.gap = gaps[displayGap];

  return (
    <SbEditable content={blok} key={blok._uid}>
      <div className={displayClasses.join(" ")} style={displayStyles}>
        {children || body}
      </div>
    </SbEditable>
  );
};

Display.propTypes = {
  parent: PropTypes.shape({
    display: PropTypes.shape({
      style: PropTypes.string,
      type: PropTypes.string,
      size: PropTypes.string,
    }),
  }),
  blok: PropTypes.shape({
    body: PropTypes.array,
    type: PropTypes.oneOf(["", "row", "col", "card", "slide"]),
    align: PropTypes.oneOf(["", "start", "center", "end", "stretch"]),
    justify: PropTypes.oneOf(["", "start", "center", "end", "stretch"]),
    gap: PropTypes.oneOf(["", "small", "mid", "large"]),
    size: PropTypes.oneOf(["", "quarter", "oneThird", "half", "full"]),
  }),
};

export default Display;
