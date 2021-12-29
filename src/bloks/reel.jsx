import React, { useState } from "react";
import PropTypes from "prop-types";
import DynamicComponent from "../utils/dynamicComponent";
import { createClasses, styleSwitch } from "../utils/utils";
import Icon from "../elements/icon";

const Reel = ({ blok }) => {
  const slides =
    blok.body &&
    blok.body.map((childBlok) => {
      childBlok.parentStyle = styleSwitch(blok.style);
      return (
        <div key={childBlok._uid} className="reel--slide">
          <DynamicComponent blok={childBlok} />
        </div>
      );
    });

  const [slide, setSlide] = useState(0);
  const slidesNum = slides.length;

  const slideTo = (flow) => {
    let _slide = slide;
    if (flow === "prev") {
      _slide = slide > 0 ? _slide - 1 : slidesNum - 1;
    } else {
      _slide = slide < slidesNum - 1 ? _slide + 1 : 0;
    }
    setSlide(_slide);
  };

  const reelClasses = createClasses(blok, ["height", "style"]);
  const wrapperStyles = {
    width: `${slidesNum}00vw`,
    transform: `translateX(-${slide}00vw)`,
  };

  return (
    <section className={reelClasses.join(" ")}>
      <div className="reel--container">
        <ReelButton flow="prev" handleClick={(f) => slideTo(f)} />
        <div className="reel--wrapper" style={wrapperStyles}>
          {slides}
        </div>
        <ReelButton flow="next" handleClick={(f) => slideTo(f)} />
      </div>
    </section>
  );
};

const ReelButton = ({ flow, handleClick = () => null }) => (
  <button
    className={`reel--button __${flow}`}
    onClick={() => handleClick(flow)}
  >
    <Icon name={`arrow-${flow === "prev" ? "left" : "right"}`} />
  </button>
);

Reel.propTypes = {
  blok: PropTypes.shape({
    id: PropTypes.string,
    body: PropTypes.array,
    responsive: PropTypes.bool,
    showSlides: PropTypes.oneOf(["1", "2", "3", "4", "5", "6"]),
    style: PropTypes.oneOf(["", "primary", "secondary", "dark", "light"]),
    height: PropTypes.oneOf(["auto", "100", "66", "50", "33", "25"]),
  }),
};

export default Reel;
