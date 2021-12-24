import React from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import DynamicComponent from "../utils/dynamicComponent";
import { createClasses, styleSwitch } from "../utils/utils";
import Container from "../globals/container";
import Flow from "../components/flow";

const Section = ({ blok }) => {
  const { image } = blok;
  const body =
    blok.body &&
    blok.body.map((childBlok) => {
      childBlok.parentStyle = styleSwitch(blok.style);
      return <DynamicComponent blok={childBlok} key={childBlok._uid} />;
    });

  const sectionClasses = createClasses(blok, ["height", "style", "gap"]);
  !!image && !!image.filename && sectionClasses.push(`__has_background`);

  const flowProps = {
    component: "flow",
    align: "stretch",
    justify: "start",
    size: "full",
    gap: blok.gap,
  };
  const sectionStyles = {
    backgroundImage:
      !!image && !!image.filename ? `url(${image.filename})` : null,
  };

  return (
    <SbEditable content={blok} key={blok._uid}>
      <section
        id={blok.id}
        className={sectionClasses.join(" ")}
        style={sectionStyles}
      >
        <Container responsive={!blok.responsive}>
          <Flow blok={flowProps}>{body}</Flow>
        </Container>
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
    height: PropTypes.oneOf(["auto", "100", "66", "50", "33", "25"]),
    gap: PropTypes.oneOf(["", "small", "mid", "large"]),
    image: PropTypes.shape({
      filename: PropTypes.string,
      alt: PropTypes.string,
    }),
  }),
};

export default Section;
