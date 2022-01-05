import React from "react";

const Field = ({ label, error, children }) => {
  return (
    <div className="field">
      <label className="field--label">{label}</label>
      {children}
      {!!error && <p className="field--error">{error}</p>}
    </div>
  );
};

export default Field;
