const createClasses = (props, styles) => {
  const classes = [];
  classes.push(props.component);
  !!styles.length &&
    styles.map((key) => {
      if (!!props[key]) {
        classes.push(
          typeof props[key] === "boolean"
            ? `__${key}`
            : `__${key}_${props[key]}`
        );
      }
    });
  return classes;
};

const styleSwitch = (style) => {
  let linkStyle, buttonStyle;
  switch (style) {
    case "primary":
      linkStyle = "light";
      buttonStyle = "secondary";
      break;
    case "secondary":
      linkStyle = "light";
      buttonStyle = "primary";
      break;
    case "light":
      linkStyle = "dark";
      buttonStyle = "primary";
      break;
    case "dark":
      linkStyle = "light";
      buttonStyle = "secondary";
      break;
    default:
      linkStyle = "dark";
      buttonStyle = "primary";
      break;
  }
  return { linkStyle, buttonStyle };
};

const defaultLang = process.env.DEFAULT_LANG;
const getUrl = (link) => {
  let url = link.cached_url || "";
  const isHome = url.includes("home");
  const isDefaultLang = url.includes(defaultLang);
  const isInternal = link.url === "";

  if (isInternal) {
    if (isHome) {
      url = url.replace("home", "");
    }
    if (isDefaultLang) {
      url = url.replace(defaultLang, "");
    }
    url = `/${url}`;

    return url;
  }
};

export { createClasses, styleSwitch, getUrl };
