import React from "react";
import PropTypes from "prop-types";

const Container = ({ styles, children }) => {
  return <div className={`container ${styles}`}>{children}</div>;
};

Container.propTypes = {
  styles: PropTypes.string,
  children: PropTypes.node,
};

export default Container;
