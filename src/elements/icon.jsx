import React from "react";
import PropTypes from "prop-types";

const Icon = ({ name, size, style }) => {
  const iconClasses = ["icon"];
  !!name && iconClasses.push(`icon--${name}`);
  !!size && iconClasses.push(`__${size}`);
  !!style && iconClasses.push(`__${style}`);
  if (!!name) {
    return <i className={iconClasses.join(" ")} />;
  } else {
    return null;
  }
};

Icon.propTypes = {
  size: PropTypes.oneOf(["", "small", "mid", "large"]),
  name: PropTypes.string,
};

export default Icon;
