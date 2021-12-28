import React from "react";
import PropTypes from "prop-types";
import DynamicComponent from "../utils/dynamicComponent";
import { createClasses, styleSwitch } from "../utils/utils";
import Container from "./container";
import Flow from "../components/flow";

const Footer = ({ blok }) => {
  const menus =
    blok.body &&
    blok.body.map((childBlok) => {
      childBlok.parentStyle = styleSwitch(blok.style);
      return <DynamicComponent blok={childBlok} key={childBlok._uid} />;
    });

  const footerClasses = createClasses(blok, ["style"]);

  const flowProps = {
    component: "flow",
    align: "stretch",
    size: "full",
  };

  return (
    <footer className={footerClasses.join(" ")}>
      <div className="footer--menu">
        <Container responsive styles="footer--wrapper">
          <Flow blok={flowProps}>{menus}</Flow>
        </Container>
      </div>
      <div className="footer--copyright">
        <Container responsive>{blok.copyright}</Container>
      </div>
    </footer>
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
