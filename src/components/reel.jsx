import React, { useState } from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import DynamicComponent from "../utils/dynamicComponent";
import { createClasses } from "../utils/utils";
import Icon from "../elements/icon";

const Reel = ({ blok, parent }) => {
  const width = typeof window !== "undefined" ? window.innerWidth : 1024;
  const slideProps = parent || {};

  const slides =
    blok.body &&
    blok.body.map((childBlok) => {
      return (
        <DynamicComponent
          key={childBlok._uid}
          blok={childBlok}
          parent={{ ...slideProps }}
        />
      );
    });

  const [slide, setSlide] = useState(0);
  const slidesNum = slides.length;
  const showSlides = parseInt(blok.showSlides);
  const scrollSlides = parseInt(blok.scrollSlides);

  let settings = {};
  if (width <= 428) {
    settings = { show: 1, scroll: 1 };
  } else if (width > 428 && width <= 1024) {
    settings = {
      show: showSlides < 3 ? showSlides : 2,
      scroll: scrollSlides < 3 ? showSlides : 2,
    };
  } else if (width > 1024) {
    settings = { show: showSlides, scroll: scrollSlides };
  }

  const slideTo = (flow) => {
    let _slide = slide;
    if (flow === "prev") {
      _slide =
        slide > 0 ? _slide - settings.scroll : slidesNum - settings.scroll;
    } else {
      _slide =
        slide < slidesNum - settings.scroll ? _slide + settings.scroll : 0;
    }
    setSlide(_slide);
  };

  const parentProps = parent?.reel || {};

  blok.style = blok.style || parentProps.style;

  const reelClasses = createClasses(blok, ["height", "style"]);
  const wrapperStyles = {
    width: `${(100 / settings.show) * slidesNum}%`,
    transform: `translateX(-${(100 / slidesNum) * slide}%)`,
  };

  return (
    <SbEditable content={blok} key={blok._uid}>
      <div className={reelClasses.join(" ")}>
        {slidesNum > showSlides && (
          <ReelButton
            flow="prev"
            handleClick={(f) => slideTo(f)}
            style={parent.action.style}
          />
        )}
        <div className="reel--container">
          <div className="reel--wrapper" style={wrapperStyles}>
            {slides}
          </div>
        </div>
        {slidesNum > showSlides && (
          <ReelButton
            flow="next"
            handleClick={(f) => slideTo(f)}
            style={parent.action.style}
          />
        )}
      </div>
    </SbEditable>
  );
};

const ReelButton = ({ flow, style, handleClick = () => null }) => (
  <button
    className={`reel--button __${flow}`}
    onClick={() => handleClick(flow)}
  >
    <Icon
      blok={{
        name: `arrow-${
          flow === "prev" ? "arrow_back_ios" : "arrow_forward_ios"
        }`,
        size: "large",
        style: style || "light",
      }}
    />
  </button>
);

Reel.propTypes = {
  parent: PropTypes.shape({
    reel: PropTypes.shape({
      style: PropTypes.string,
    }),
  }),
  blok: PropTypes.shape({
    body: PropTypes.array,
    responsive: PropTypes.bool,
    showSlides: PropTypes.oneOf(["1", "2", "3", "4", "5", "6", "7", "8"]),
    scrollSlides: PropTypes.oneOf(["1", "2", "3", "4"]),
  }),
};

export default Reel;
