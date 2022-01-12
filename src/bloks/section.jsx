import React from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import DynamicComponent from "../utils/dynamicComponent";
import { createClasses, styleSwitch } from "../utils/utils";

const Section = ({ blok }) => {
  const { image } = blok;

  const bodyProps = {
    action: {
      style: styleSwitch(blok.style),
    },
  };
  const body =
    blok.body &&
    blok.body.map((childBlok) => {
      return (
        <DynamicComponent
          blok={childBlok}
          parent={{ ...bodyProps }}
          key={childBlok._uid}
        />
      );
    });

  const sectionClasses = createClasses(blok, ["height", "style", "space"]);

  const wrapperClasses = [
    "section--wrapper",
    blok.responsive ? "container" : "container__responsive",
  ];

  return (
    <SbEditable content={blok} key={blok._uid}>
      <section
        id={blok.id}
        className={sectionClasses.join(" ")}
      >
        <div className={wrapperClasses.join(" ")}>{body}</div>
      </section>
    </SbEditable>
  );
};

Section.propTypes = {
  blok: PropTypes.shape({
    id: PropTypes.string,
    body: PropTypes.array,
    responsive: PropTypes.bool,
    style: PropTypes.oneOf(["", "primary", "secondary", "dark", "light"]),
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
