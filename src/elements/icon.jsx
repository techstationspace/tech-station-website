import React from "react";
import PropTypes from "prop-types";

const Icon = ({ name, size, style }) => {
  const iconClasses = ["icon"];
  !!name && iconClasses.push(name);
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
  name: PropTypes.oneOf([
    "",
    "accordion-fold",
    "accordion-unfold",
    "action-add",
    "action-circle-add",
    "action-circle-clear",
    "action-circle-filled-add",
    "action-circle-filled-clear",
    "action-circle-filled-info",
    "action-circle-filled-remove",
    "action-circle-filled-settings",
    "action-circle-remove",
    "action-clear",
    "action-delete",
    "action-info",
    "action-remove",
    "alarm-add",
    "alarm-default",
    "alarm-off",
    "alarm-on",
    "alert-circle-empty",
    "alert-circle-full",
    "alert-explosion",
    "alert-hexagonal",
    "alert-triangle",
    "arrow-down",
    "arrow-left",
    "arrow-right",
    "arrow-up",
    "calendar-date",
    "calendar-default",
    "checkbox-checked",
    "checkbox-null",
    "checkbox-unchecked",
    "dart-down",
    "dart-left",
    "dart-right",
    "dart-up",
    "display-float",
    "display-full",
    "interact-close",
    "interact-delete",
    "interact-done-all",
    "interact-done",
    "interact-update",
    "map-location",
    "menu-hamburger",
    "menu-points-vertical",
    "menu-setting",
    "menu-points-horizontal",
    "notification-disabled",
    "notification-none",
    "notification-notify",
    "notification-ring",
    "operation-download",
    "operation-upload",
    "organize-grid",
    "organize-list",
    "radio-checked",
    "radio-unchecked",
    "star-empty",
    "star-full",
    "star-half",
    "triangle-down",
    "triangle-up",
    "user-add-group",
    "user-add",
    "user-defalut",
    "user-group",
    "visibility-hidden",
    "visibility-visible",
  ]),
};

export default Icon;
