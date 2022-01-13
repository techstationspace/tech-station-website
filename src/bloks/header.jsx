import React, { useState } from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import DynamicComponent from "../utils/dynamicComponent";
import { createClasses, themeSwitch } from "../utils/utils";
import Dropdown from "../elements/dropdown";
import Icon from "../elements/icon";

// const defaultLang = process.env.GATSBY_DEFAULT_LANG;

const Header = ({ blok, languages }) => {
  const defaultLang = "it";
  const [showMenu, setShowMenu] = useState(false);
  const currentLang = languages.current;

  const languagesList = [];
  languages.list.map(
    (lang) =>
      lang !== currentLang &&
      languagesList.push({
        text: lang.toUpperCase(),
        url: `/${lang === defaultLang ? "" : lang}`,
      })
  );
  console.log(languagesList);

  const menuProps = {
    action: {
      style: "light",
      type: "link",
    },
  };
  const menu =
    blok.menu &&
    blok.menu.map((childBlok) => {
      return (
        <DynamicComponent
          blok={childBlok}
          parent={menuProps}
          key={childBlok._uid}
        />
      );
    });

  const actionProps = {
    action: {
      style: themeSwitch(blok.style),
      type: "button",
    },
  };
  const action =
    blok.action &&
    blok.action.map((childBlok) => {
      return (
        <DynamicComponent
          blok={childBlok}
          parent={actionProps}
          key={childBlok._uid}
        />
      );
    });

  const headerClasses = createClasses(blok, ["style", "fixed"]);
  const toggleIcon = showMenu ? "interact-close" : "menu-hamburger";

  return (
    <SbEditable content={blok} key={blok._uid}>
      <header className={headerClasses.join(" ")}>
        <div className="header--wrapper">
          <a
            className="header--logo"
            href={`/${currentLang === defaultLang ? "" : currentLang}`}
          >
            <img src={blok.logo.filename} alt={"logo"} />
          </a>
          <div className={`header--menu ${showMenu ? "active" : ""}`}>
            <nav className="header--nav">{menu}</nav>
            <nav className="header--nav">{action}</nav>
          </div>
          {languages.list.length > 1 && (
            <Dropdown
              styles="header--lang"
              text={currentLang}
              list={languagesList}
            />
          )}

          <button
            className="header--toggle"
            onClick={() => setShowMenu(!showMenu)}
          >
            <Icon name={toggleIcon} />
          </button>
        </div>
      </header>
    </SbEditable>
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
