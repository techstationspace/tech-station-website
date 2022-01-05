import React from "react";
import useStoryblok from "../utils/storyblok";
import DynamicComponent from "../utils/dynamicComponent";
import Layout from "../components/layout";

const PageIndex = ({ pageContext, location }) => {
  const { content } = useStoryblok(pageContext.story, location);
  const { settings } = pageContext;

  const body =
    content.body &&
    content.body.map((childBlok) => (
      <DynamicComponent blok={childBlok} key={childBlok._uid} />
    ));

  return (
    <Layout location={location} settings={settings}>
      {body}
    </Layout>
  );
};

export default PageIndex;
