import React from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";

const Icon = ({ blok }) => {
  const isSocialIcon = blok.name.includes("social");
  const iconClasses = ["icon"];
  isSocialIcon && iconClasses.push("social");
  isSocialIcon && iconClasses.push(blok.name);
  blok?.size && iconClasses.push(`__${blok.size}`);
  blok?.style && iconClasses.push(`__${blok.style}`);

  if (blok?.name) {
    return (
      <SbEditable content={blok} key={blok._uid}>
        {isSocialIcon ? (
          <span className={iconClasses.join(" ")} />
        ) : (
          <span className={iconClasses.join(" ")}>{blok.name}</span>
        )}
      </SbEditable>
    );
  } else {
    return null;
  }
};

Icon.propTypes = {
  blok: PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.oneOf(["", "small", "medium", "large", "huge"]),
    style: PropTypes.oneOf(["", "primary", "secondary", "dark", "light"]),
  }),
};

export default Icon;
