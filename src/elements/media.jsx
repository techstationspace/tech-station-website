import React from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import { getUrl } from "../utils/utils";

const Media = ({ blok, parent }) => {
  const parentProps = parent?.media || {};
  blok.size = blok.size || parentProps?.size || 100;

  const mediaClasses = ["media"];
  blok.background && mediaClasses.push("__background");

  const Content = blok.background ? Background : Image;
  return (
    <SbEditable content={blok} key={blok._uid}>
      <div className={mediaClasses.join(" ")} id={blok.id || ""}>
        {!!blok.link.cached_url ? (
          <Link blok={blok}>
            <Content blok={blok} />
          </Link>
        ) : (
          <Content blok={blok} />
        )}
      </div>
    </SbEditable>
  );
};

const Link = ({ blok, children }) => (
  <a
    className="media--link"
    href={getUrl(blok.link)}
    target={blok.target ? "_blank" : "_self"}
    rel="noreferrer"
  >
    {children}
  </a>
);

const Background = ({ blok }) => {
  const styles = {};

  const layers = [];
  blok?.overlay && layers.push(blok.overlay);
  blok.image?.filename && layers.push(`url(${blok.image.filename})`);
  styles.backgroundImage = layers;

  styles.paddingTop = `${blok.size || 0}%`;

  return (
    <div className="media--background" style={styles} title={blok.image.alt} />
  );
};

const Image = ({ blok }) => (
  <img
    className="media--image"
    src={blok.image.filename}
    alt={blok.image.alt}
    width={`${blok.size}%`}
  />
);

Media.propTypes = {
  parent: PropTypes.shape({
    media: PropTypes.shape({
      size: PropTypes.string,
    }),
  }),
  blok: PropTypes.shape({
    id: PropTypes.string,
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
