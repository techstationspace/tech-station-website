import React from "react";

const Container = ({ children, responsive, styles }) => {
  const containerClasses = [
    !!styles ? styles : "",
    "container",
    !!responsive ? "__responsive" : "",
  ].join(" ");

  return <div className={containerClasses}>{children}</div>;
};

export default Container;