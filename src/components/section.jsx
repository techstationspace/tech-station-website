import React from "react";
import PropTypes from "prop-types";
import Container from "../bloks/container";

const Section = ({ blok }) => {
  return (
    <section className="section">
      <Container styles={blok.responsive ? "__responsive" : ""}>
        <div className="section--wrapper">
          <div className="section--media">Media</div>
          <div className="section--contents">Contents</div>
        </div>
      </Container>
    </section>
  );
};

Section.propTypes = {
  blok: PropTypes.shape({
    id: PropTypes.string,
    responsive: PropTypes.bool,
  }),
};

export default Section;
