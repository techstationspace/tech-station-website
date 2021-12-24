import React, { useState } from "react";
import PropTypes from "prop-types";
import DynamicComponent from "../utils/dynamicComponent";
import { createClasses, styleSwitch } from "../utils/utils";
import Container from "./container";
import Dropdown from "../elements/dropdown";

const defaultLang = process.env.DEFAULT_LANG;

const Header = ({ blok, languages }) => {
  const [showMenu, setShowMenu] = useState(false);
  const currentLang = languages.current;

  const menu =
    blok.menu &&
    blok.menu.map((childBlok) => {
      childBlok.parentStyle = styleSwitch(blok.style);
      return <DynamicComponent blok={childBlok} key={childBlok._uid} />;
    });
  const action =
    blok.action &&
    blok.action.map((childBlok) => {
      childBlok.parentStyle = styleSwitch(blok.style);
      return <DynamicComponent blok={childBlok} key={childBlok._uid} />;
    });

  const headerClasses = createClasses(blok, ["style", "fixed"]);

  return (
    <header className={headerClasses.join(" ")}>
      <Container responsive styles="header--wrapper">
        <a href={`/${currentLang === defaultLang ? "" : currentLang}`}>
          <img className="header--logo" src={blok.logo.filename} alt={"logo"} />
        </a>
        <div className={`header--menu ${showMenu ? "active" : ""}`}>
          <nav className="header--nav">{menu}</nav>
          <nav className="header--nav">{action}</nav>
        </div>
        {languages.list.length > 1 && (
          <Dropdown
            styles="header--lang"
            text={currentLang}
            list={languages.list.map((lang) => ({
              text: lang.toUpperCase(),
              url: `/${lang === defaultLang ? "" : lang}`,
            }))}
          />
        )}

        <button
          className="header--toggle"
          onClick={() => setShowMenu(!showMenu)}
        >
          menu
        </button>
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
