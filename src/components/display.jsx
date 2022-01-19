import React from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import DynamicComponent from "../utils/dynamicComponent";
import { createClasses } from "../utils/utils";

const Display = ({ blok, parent }) => {
  const bodyProps = { ...parent } || {};
  if (blok.type === "card") {
    bodyProps.action.size = "small";
  }
  bodyProps.display = { gap: blok.gap };

  const body =
    blok.body &&
    blok.body.map((childBlok) => {
      const innerClasses = [];
      innerClasses.push(`${blok.type}--${childBlok.component}`);
      blok.gap && innerClasses.push(`__${blok.gap}`);
      if (childBlok.component === "display") {
        childBlok.size && innerClasses.push(`__${childBlok.size}`);
      }
      return !!childBlok.background ? (
        <DynamicComponent
          key={childBlok._uid}
          blok={childBlok}
          parent={{ ...bodyProps }}
        />
      ) : (
        <div key={childBlok._uid} className={innerClasses.join(" ")}>
          <DynamicComponent blok={childBlok} parent={{ ...bodyProps }} />
        </div>
      );
    });

  blok.gap = parent.display?.gap || blok.gap;
  const displayClasses = createClasses(
    blok,
    ["align", "justify", "gap"],
    `${blok.type}s`
  );

  return (
    <SbEditable content={blok} key={blok._uid}>
      <div className={displayClasses.join(" ")}>{body}</div>
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
    type: PropTypes.oneOf(["", "rows", "cols", "card", "slide"]),
    align: PropTypes.oneOf(["", "start", "center", "end", "stretch"]),
    justify: PropTypes.oneOf(["", "start", "center", "end", "stretch"]),
    gap: PropTypes.oneOf(["", "default", "small", "mid", "large"]),
    size: PropTypes.oneOf(["", "quarter", "oneThird", "half", "full"]),
  }),
};

export default Display;
