import React from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import DynamicComponent from "../utils/dynamicComponent";
import { createClasses, themeSwitch } from "../utils/utils";

const Section = ({ blok }) => {
  const parent = {
    action: {
      style: themeSwitch(blok.theme),
    },
  };

  const sectionClasses = createClasses(blok, ["height", "theme", "space"]);
  const hasBackground = blok.body.filter((b) => b.component === "media").length;
  !!hasBackground && sectionClasses.push("__cover");

  const contanierClasses = ["container"];
  !blok.responsive && contanierClasses.push("__responsive");

  const body =
    blok.body &&
    blok.body.map((childBlok) => {
      return (
        <DynamicComponent
          blok={childBlok}
          parent={parent}
          key={childBlok._uid}
        />
      );
    });

  return (
    <SbEditable content={blok} key={blok._uid}>
      <section id={blok.id} className={sectionClasses.join(" ")}>
        <div className={contanierClasses.join(" ")}>{body}</div>
      </section>
    </SbEditable>
  );
};

Section.propTypes = {
  blok: PropTypes.shape({
    id: PropTypes.string,
    body: PropTypes.array,
    responsive: PropTypes.bool,
    theme: PropTypes.oneOf([
      "",
      "primary",
      "secondary",
      "dark",
      "light",
      "primary_background",
      "secondary_background",
      "dark_background",
    ]),
    height: PropTypes.oneOf([
      "",
      "full",
      "twoThird",
      "half",
      "oneThird",
      "quarter",
    ]),
    space: PropTypes.oneOf(["", "none", "small", "mid", "large"]),
    image: PropTypes.shape({
      filename: PropTypes.string,
      alt: PropTypes.string,
    }),
  }),
};

export default Section;
