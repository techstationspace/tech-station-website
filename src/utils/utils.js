const createClasses = (props, styles, name) => {
  const classes = [];
  const directProps = ["direction", "type", "style", "gap", "size"];
  classes.push(name || props.component);
  !!styles.length &&
    styles.map((key) => {
      if (!!props[key] && typeof props[key] === "boolean") {
        return classes.push(`__${key}`);
      } else if (!!props[key] && directProps.includes(key)) {
        return classes.push(`__${props[key]}`);
      } else if (!!props[key]) {
        return classes.push(`__${key}_${props[key]}`);
      }
      return;
    });
  return classes;
};

const getClasses = (props, styles, component) => {
  const classes = [];
  classes.push(component || props.component);
  !!styles.length &&
    styles.map((key) => {
      const prop = props[key];
      if (!!prop) {
        const isboolean = typeof prop === "boolean";
        return classes.push(isboolean ? `_${key}` : `${key}_${prop}`);
      }
      return;
    });
  return classes;
};

const themeSwitch = (theme) => {
  switch (theme) {
    case "light":
      return "dark";
    case "primary_background":
      return "secondary";
    case "secondary_background":
      return "primary";
    case "dark_background":
      return "light";
    default:
      return theme;
  }
};

const defaultLang = process.env.GATSBY_DEFAULT_LANG;
const getUrl = (link) => {
  let url = link.cached_url || "";
  const isHome = url.includes("home");
  const isDefaultLang = url.includes(`/${defaultLang}`);
  const isInternal = link.url === "";

  if (isInternal) {
    if (isHome) {
      url = url.replace("home", "");
    }
    if (isDefaultLang) {
      url = url.replace(defaultLang, "");
    }
    url = `/${url}`;
  }

  return url;
};

export { createClasses, themeSwitch, getUrl, getClasses };
