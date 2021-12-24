import React from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import { getUrl } from "../utils/utils";
import Container from "../globals/container";

const Media = ({ blok }) => {
  const image = () => (
    <div className="media">
      <img
        className="media--image"
        src={blok.image.filename}
        alt={blok.image.alt}
      />
    </div>
  );
  const background = () => (
    <div
      style={{ backgroundImage: `url(${blok.image.filename})` }}
      className="media--cover"
      title={blok.image.alt}
    />
  );
  const MediaType = !!blok.background ? background : image;
  return (
    <SbEditable content={blok} key={blok._uid}>
      {!!blok.link.cached_url ? (
        <a
          href={!!blok.link ? getUrl(blok.link) : null}
          rel={blok.target ? "noreferrer" : null}
        >
          <MediaType />
        </a>
      ) : (
        <MediaType />
      )}
    </SbEditable>
  );
};

Media.propTypes = {
  blok: PropTypes.shape({
    image: PropTypes.shape({
      filename: PropTypes.string,
      alt: PropTypes.string,
    }),
    link: PropTypes.shape({
      cached_url: PropTypes.string,
    }),
    background: PropTypes.bool,
  }),
};

export default Media;
