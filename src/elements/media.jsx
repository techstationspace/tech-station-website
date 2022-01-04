import React from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import { getUrl } from "../utils/utils";

const Media = ({ blok, parent }) => {
  const parentProps = parent?.media || {};
  blok.size = blok.size || parentProps?.size || 100;
  const image = () => (
    <img
      className="media media--image"
      width={`${blok.size}%`}
      src={blok.image.filename}
      alt={blok.image.alt}
    />
  );

  const background = () => (
    <div
      style={{
        backgroundImage: `url(${blok.image.filename})`,
        paddingTop: `${blok.size}%`,
      }}
      className="media media--cover"
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
  parent: PropTypes.shape({
    media: PropTypes.shape({
      size: PropTypes.string,
    }),
  }),
  blok: PropTypes.shape({
    image: PropTypes.shape({
      filename: PropTypes.string,
      alt: PropTypes.string,
    }),
    link: PropTypes.shape({
      cached_url: PropTypes.string,
    }),
    size: PropTypes.string,
    background: PropTypes.bool,
  }),
};

export default Media;
