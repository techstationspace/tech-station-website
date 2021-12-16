import React from "react";
import PropTypes from "prop-types";
import DynamicComponent from "../utils/dynamicComponent";
import Container from "./container";
import Dropdown from "../elements/dropdown";

const defaultLang = process.env.DEFAULT_LANG;

const Header = ({ blok, languages }) => {
  const currentLang = languages.current;
  const menu =
    blok.menu &&
    blok.menu.map((childBlok) => {
      return <DynamicComponent blok={childBlok} key={childBlok._uid} />;
    });
  const action =
    blok.action &&
    blok.action.map((childBlok) => {
      return <DynamicComponent blok={childBlok} key={childBlok._uid} />;
    });

  return (
    <header className="header">
      <Container styles="__responsive __header">
        <a href={`/${currentLang === defaultLang ? "" : currentLang}`}>
          <img className="header--logo" src={blok.logo.filename} alt={"logo"} />
        </a>
        <div className="header--nav">
          <nav className="header--menu">{menu}</nav>
          <nav className="header--action">{action}</nav>
          {languages.list.length > 1 && (
            <Dropdown
              text={currentLang}
              list={languages.list.map((lang) => ({
                text: lang.toUpperCase(),
                url: `/${lang === defaultLang ? "" : lang}`,
              }))}
            />
          )}
        </div>
        <div className="header--toggle">Menu</div>
      </Container>
    </header>
  );
};

Header.propTypes = {
  blok: PropTypes.shape({
    logo: PropTypes.shape({
      fileName: PropTypes.string,
      alt: PropTypes.string,
    }),
    menu: PropTypes.arrayOf(PropTypes.object),
    action: PropTypes.arrayOf(PropTypes.object),
    style: PropTypes.oneOf(["primary", "secondary", "dark", "light"]),
    fixed: PropTypes.bool,
  }),
  languages: PropTypes.shape({
    current: PropTypes.string,
    list: PropTypes.arrayOf(PropTypes.string),
  }),
  onChangeLanguage: PropTypes.func,
};

export default Header;
