import React from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import { createClasses } from "../utils/utils";

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

  blok.style = blok.style || blok.parentStyle.buttonStyle;
  blok.type = blok.type || blok.parentType;
  blok.size = blok.size || blok.parentSize;

  const buttonClasses = createClasses(blok, ["type", "style", "size"]);

  return (
    <SbEditable content={blok} key={blok._uid}>
      <button
        className={buttonClasses.join(" ")}
        onClick={() => fireClick(blok?.function, value || null)}
        disabled={disabled}
      >
        {blok.text}
      </button>
    </SbEditable>
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
    type: PropTypes.oneOf(["filled", "text", "rounded"]),
    style: PropTypes.oneOf([
      "",
      "primary",
      "secondary",
      "service",
      "light",
      "dark",
    ]),
    size: PropTypes.oneOf(["default", "small", "medium", "large"]),
  }),
  value: PropTypes.any,
  disabled: PropTypes.bool,
};

export default Button;
