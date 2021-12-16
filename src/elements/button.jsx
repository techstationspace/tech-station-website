import React from "react";
import PropTypes from "prop-types";

const Button = ({ blok, value, disabled, onChange = () => null }) => {
  const fireClick = (fn, val) => {
    switch (fn) {
      case "log":
        console.log(val);
        break;
      default:
        onChange(val);
        break;
    }
  };
  return (
    <button
      className="button"
      onClick={() => fireClick(blok?.function, value || null)}
      disabled={disabled}
    >
      {blok.text}
    </button>
  );
};

Button.defaultProps = {
  blok: {
    text: "button text",
  },
  value: "Button clicked",
  disabled: false,
};

Button.propTypes = {
  blok: PropTypes.shape({
    text: PropTypes.string,
    function: PropTypes.string,
    style: PropTypes.array,
  }),
  value: PropTypes.any,
  disabled: PropTypes.bool,
};

export default Button;
