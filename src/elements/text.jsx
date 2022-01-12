import React from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import StoryblokClient from "storyblok-js-client";
import { createClasses } from "../utils/utils";

const sbClient = new StoryblokClient({
  accessToken: `${process.env.STORY_BLOK}`,
  cache: {
    clear: "auto",
    type: "memory",
  },
});
const Text = ({ blok, parent }) => {
  const parentProps = parent?.text || {};
  blok.style = blok.style || parentProps?.style;
  const textClasses = createClasses(blok, ["style", "align"]);

  const body = sbClient.richTextResolver.render(blok.body);

  return (
    <SbEditable content={blok} key={blok._uid}>
      <div className={textClasses} dangerouslySetInnerHTML={{ __html: body }} />
    </SbEditable>
  );
};

Text.propTypes = {
  parent: PropTypes.shape({
    text: PropTypes.shape({
      style: PropTypes.string,
    }),
  }),
  blok: PropTypes.shape({
    style: PropTypes.oneOf(["", "primary", "secondary", "dark", "light"]),
    body: PropTypes.object,
    align: PropTypes.oneOf(["", "left", "right", "center"]),
  }),
};

export default Text;
