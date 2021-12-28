import React from "react";
import useStoryblok from "../utils/storyblok";
import Project from "../globals/project";
import Layout from "../globals/layout";

const ProjectIndex = ({ pageContext, location }) => {
  const story = useStoryblok(pageContext.story, location);
  const settings = pageContext.settings;
  return (
    <Layout location={location} settings={settings}>
      <Project blok={story.content} />
    </Layout>
  );
};

export default ProjectIndex;
