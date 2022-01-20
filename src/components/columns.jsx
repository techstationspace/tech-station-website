import React from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import DynamicComponent from "../utils/dynamicComponent";
import { getClasses } from "../utils/utils";

const Columns = ({ blok, parent }) => {
  const columnsClasses = getClasses(blok, ["gap", "align", "justify"]);
  const body =
    blok.body &&
    blok.body.map((childBlok) => (
      <DynamicComponent key={childBlok._uid} blok={childBlok} parent={parent} />
    ));

  return (
    <SbEditable content={blok} key={blok._uid}>
      <div className={columnsClasses.join(" ")}>{body}</div>
    </SbEditable>
  );
};

Columns.propTypes = {
  blok: PropTypes.shape({
    body: PropTypes.array,
    gap: PropTypes.oneOf(["", "none", "small", "medium", "large"]),
    align: PropTypes.oneOf(["", "top", "center", "bottom", "adapt"]),
    justify: PropTypes.oneOf(["", "left", "center", "right", "spaced"]),
  }),
  parent: PropTypes.object,
};

export default Columns;
