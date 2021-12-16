import React from "react";
import useStoryblok from "../utils/storyblok";
import Page from "../bloks/page";
import Layout from "../bloks/layout";

const PageIndex = ({ pageContext, location }) => {
  const story = useStoryblok(pageContext.story, location);
  const settings = pageContext.settings;
  return (
    <Layout location={location} settings={settings}>
      <Page blok={story.content} />
    </Layout>
  );
};

export default PageIndex;
