import React from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import StoryblokClient from "storyblok-js-client";

const sbClient = new StoryblokClient({
  accessToken: `${process.env.STORY_BLOK}`,
  cache: {
    clear: "auto",
    type: "memory",
  },
});

const Tale = ({ blok }) => {
  const paragraph = sbClient.richTextResolver.render(blok.paragraph);
  return (
    <SbEditable content={blok} key={blok._uid}>
      <div className="tale">
        {blok?.paragraph && (
          <div
            className="tale--paragraph"
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        )}
        {blok?.caption && (
          <p className="tale--caption">
            <small>{blok.caption}</small>
          </p>
        )}
      </div>
    </SbEditable>
  );
};

Tale.defaultProps = {
  blok: {
    paragraph: "<p>Description of the topic...<p>",
    caption: "*topic: the argument of this content.",
  },
};

Tale.propTypes = {
  blok: PropTypes.shape({
    paragraph: PropTypes.object,
    caption: PropTypes.string,
  }),
};

export default Tale;
