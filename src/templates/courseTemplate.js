import React from "react";
import useStoryblok from "../utils/storyblok";
import Course from "../globals/course";
import Layout from "../globals/layout";

const CourseIndex = ({ pageContext, location }) => {
  const story = useStoryblok(pageContext.story, location);
  // const settings = pageContext.settings;
  return (
    // <Layout location={location} settings={settings}>
    <Course blok={story.content} />
    // </Layout>
  );
};

export default CourseIndex;
