import React from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import StoryblokClient from "storyblok-js-client";
import Columns from "../components/columns";
import { createClasses } from "../utils/utils";

const sbClient = new StoryblokClient({
  accessToken: `${process.env.GATSBY_STORY_BLOK}`,
  cache: {
    clear: "auto",
    type: "memory",
  },
});

const Footer = ({ blok }) => {
  const footerClasses = createClasses(blok, ["style"]);
  const copyright = sbClient.richTextResolver.render(blok.copyright);

  const bodyProps = {
    action: {
      style: "light",
      size: "small",
    },
    display: {
      gap: "small",
    },
  };

  const footerColumns = {
    component: "columns",
    align: "top",
    justify: "left",
    body: blok.body,
  };

  return (
    <SbEditable content={blok} key={blok._uid}>
      <footer className={footerClasses.join(" ")}>
        <div className="footer--menu">
          <div className="container __responsive">
            <Columns blok={footerColumns} parent={bodyProps} />
          </div>
        </div>
        <div className="footer--copyright">
          <div
            className="container __responsive"
            dangerouslySetInnerHTML={{ __html: copyright }}
          />
        </div>
      </footer>
    </SbEditable>
  );
};

Footer.propTypes = {
  blok: PropTypes.shape({
    logo: PropTypes.shape({
      fileName: PropTypes.string,
      alt: PropTypes.string,
    }),
    menus: PropTypes.arrayOf(PropTypes.object),
    copyright: PropTypes.any,
    style: PropTypes.oneOf(["primary", "secondary", "dark", "light"]),
  }),
};

export default Footer;
