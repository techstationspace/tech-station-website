import React from "react";
import PropTypes from "prop-types";

const Checkbox = ({ blok, error, checked }) => {
  const errorMessage = error && blok.error;
  return (
    <div className="checkbox">
      <input id={blok.id} name={blok.id} type="checkbox" checked={checked} />
      <label for={blok.id} className="checkbox--label">
        <a className="checkbox--link" href={blok.link} target="_blank">
          {blok.label}
        </a>
      </label>
      {error && <p className="checkbox--error">{errorMessage}</p>}
    </div>
  );
};

Checkbox.defaultProps = {
  blok: {
    label: "Select label",
    link: "#checkbox-link",
    required: false,
    error: "Checkbox error message",
  },
  checked: false,
};

Checkbox.propTypes = {
  blok: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.string,
  }),
  error: PropTypes.bool,
  checked: PropTypes.bool,
};

export default Checkbox;
