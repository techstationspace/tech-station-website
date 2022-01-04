import React from "react";
import useStoryblok from "../utils/storyblok";
import Course from "../stories/course";
import Layout from "../components/layout";

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
