import React from "react";
import PropTypes from "prop-types";
import Container from "./container";

const Footer = ({ blok }) => {
  return (
    <footer className="footer">
      <div className="footer--menu">
        <Container styles="__responsive __footer">
          <div className="footer--wrapper">
            {/* TODO: create columns */}
          </div>
        </Container>
      </div>
      <div className="footer--copyright">
        <Container styles="__responsive">{blok.copyright}</Container>
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
