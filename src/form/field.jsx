import React from "react";
import PropTypes from "prop-types";

const Field = ({ label, info, error, required, children }) => {
  const fieldClasses = ["field"];
  required && fieldClasses.push("__required");
  return (
    <div className={fieldClasses.join(" ")}>
      <label className="field--label">{label}</label>
      {!!info && <p className="field--info">{info}</p>}
      {children}
      {!!error && <p className="field--error">{error}</p>}
    </div>
  );
};

Field.propTypes = {
  label: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  children: PropTypes.object,
};

export default Field;
