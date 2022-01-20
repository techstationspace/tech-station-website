import React from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import DynamicComponent from "../utils/dynamicComponent";
import { getClasses } from "../utils/utils";

const Column = ({ blok, parent }) => {
  const columnClasses = getClasses(blok, ["size", "reorder", "align"]);

  const body =
    blok.body &&
    blok.body.map((childBlok) => (
      <DynamicComponent key={childBlok._uid} blok={childBlok} parent={parent} />
    ));

  const contentClasses = getClasses(
    blok,
    ["direction", "justify", "gap"],
    "content"
  );

  return (
    <SbEditable key={blok._uid} content={blok}>
      <div className={columnClasses.join(" ")}>
        <div className={contentClasses.join(" ")}>{body}</div>
      </div>
    </SbEditable>
  );
};

Column.propTypes = {
  blok: PropTypes.shape({
    body: PropTypes.array,
    size: PropTypes.oneOf([
      "",
      "quarter",
      "one_third",
      "half",
      "two_third",
      "three_quarter",
      "full",
    ]),
    direction: PropTypes.oneOf(["", "row", "column"]),
    align: PropTypes.oneOf(["", "top", "center", "bottom", "adapt", "spaced"]),
    justify: PropTypes.oneOf(["", "left", "center", "right","adapt", "spaced"]),
    gap: PropTypes.oneOf(["", "none", "small", "medium", "large"]),
    reorder: PropTypes.string,
  }),
};

export default Column;
