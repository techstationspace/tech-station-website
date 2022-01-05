import React from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import { createClasses, getUrl } from "../utils/utils";
import Icon from "./icon";

const Action = ({ blok, parent, value, disabled, onChange = () => null }) => {
  const fireClick = (fn, val) => {
    switch (fn) {
      case "logger":
        console.log(`Button ${blok.text} pressed!`);
        break;
      default:
        onChange(val);
        break;
    }
  };

  const actionType = !!blok.function ? "button" : "link";
  const parentProps = parent?.action || {};

  blok.style = blok.style || parentProps.style;
  blok.type = blok.type || parentProps.type || actionType;
  blok.size = blok.size || parentProps.size;

  const classes = createClasses(blok, ["type", "style", "size"]);

  const link = (
    <a
      className={classes.join(" ")}
      href={getUrl(blok.url)}
      target={blok.target ? "_blank" : null}
      rel="noreferrer"
    >
      <Icon name={blok.left_icon} />
      {blok.text}
      <Icon name={blok.right_icon} />
    </a>
  );

  const button = (
    <button
      className={classes.join(" ")}
      onClick={() => fireClick(blok.function, value || null)}
      disabled={disabled}
    >
      <Icon name={blok.left_icon} />
      {blok.text}
      <Icon name={blok.right_icon} />
    </button>
  );

  return (
    <SbEditable content={blok} key={blok._uid}>
      {blok.function ? button : link}
    </SbEditable>
  );
};

Action.propTypes = {
  parent: PropTypes.shape({
    action: PropTypes.shape({
      style: PropTypes.string,
      type: PropTypes.string,
      size: PropTypes.string,
    }),
  }),
  blok: PropTypes.shape({
    id: PropTypes.string,
    text: PropTypes.string,
    url: PropTypes.shape({
      cached_url: PropTypes.string,
    }).isRequired,
    target: PropTypes.bool,
    function: PropTypes.string,
    type: PropTypes.oneOf(["", "link", "button", "rounded"]),
    style: PropTypes.oneOf([
      "",
      "primary",
      "secondary",
      "service",
      "light",
      "dark",
    ]),
    size: PropTypes.oneOf(["", "small", "medium", "large"]),
    left_icon: PropTypes.string,
    right_icon: PropTypes.string,
  }),
  value: PropTypes.any,
  disabled: PropTypes.bool,
};

export default Action;
