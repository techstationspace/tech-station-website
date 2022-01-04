import React from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import DynamicComponent from "../utils/dynamicComponent";
import { createClasses } from "../utils/utils";

const Footer = ({ blok }) => {
  const footerClasses = createClasses(blok, ["style"]);

  const bodyProps = {
    action: {
      style: "light",
      size: "small",
    },
    display: {
      size: "quarter",
      gap: "small"
    },
  };

  const body =
    blok.body &&
    blok.body.map((childBlok) => {
      return (
        <DynamicComponent
          blok={childBlok}
          parent={bodyProps}
          key={childBlok._uid}
        />
      );
    });

  return (
    <SbEditable content={blok} key={blok._uid}>
      <footer className={footerClasses.join(" ")}>
        <div className="footer--menu">
          <div className="footer--wrapper">{body}</div>
        </div>
        <div className="footer--copyright">
          <div className="footer--wrapper">{blok.copyright}</div>
        </div>
      </footer>
    </SbEditable>
  );
};

Footer.propTypes = {
  blok: PropTypes.shape({
    logo: PropTypes.shape({
      fileName: PropTypes.string,
      alt: PropTypes.string,
    }),
    menus: PropTypes.arrayOf(PropTypes.object),
    copyright: PropTypes.string,
    style: PropTypes.oneOf(["primary", "secondary", "dark", "light"]),
  }),
};

export default Footer;
