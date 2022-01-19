import React from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import { getUrl } from "../utils/utils";

const Media = ({ blok, parent }) => {
  const parentProps = parent?.media || {};
  blok.size = blok.size || parentProps?.size || 100;
  const image = () => (
    <img
      className="media __image"
      width={`${blok.size}%`}
      src={blok.image.filename}
      alt={blok.image.alt}
    />
  );

  const backgroundStyles = [];
  blok?.overlay && backgroundStyles.push(blok.overlay);
  blok.image?.filename && backgroundStyles.push(`url(${blok.image.filename})`);

  console.log(backgroundStyles.join(","));
  const background = () => (
    <div
      style={{ backgroundImage: backgroundStyles.join(",") }}
      className="media __cover"
      title={blok.image.alt}
    />
  );
  const MediaType = !!blok.background ? background : image;
  return (
    <SbEditable content={blok} key={blok._uid}>
      {!!blok.link.cached_url ? (
        <a
          className="media--link"
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
    overlay: PropTypes.string,
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
