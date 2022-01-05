const createClasses = (props, styles) => {
  const classes = [];
  const directProps = ["direction", "type", "style"];
  classes.push(props.component);
  !!styles.length &&
    styles.map((key) => {
      if (!!props[key] && typeof props[key] === "boolean") {
        return classes.push(`__${key}`);
      } else if (!!props[key] && directProps.includes(key)) {
        return classes.push(`__${props[key]}`);
      } else {
        return classes.push(`__${key}_${props[key]}`);
      }
    });
  return classes;
};

const gaps = {
  none: "0",
  small: ".75rem",
  default: "1.25rem",
  mid: "1.75rem",
  large: "3rem",
};

const widths = {
  quarter: "25%",
  oneThird: "33.3333%",
  half: "50%",
  full: "100%",
};

const styleSwitch = (style) => {
  switch (style) {
    case "primary":
      return "secondary";
    case "secondary":
      return "primary";
    case "light":
      return "primary";
    case "dark":
      return "secondary";
    default:
      return "primary";
  }
};

const defaultLang = process.env.DEFAULT_LANG;
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

export { createClasses, styleSwitch, getUrl, gaps, widths };
