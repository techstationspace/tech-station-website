import * as React from "react";
import useStoryblok from "../utils/storyblok";
import DynamicComponent from "../utils/dynamicComponent";
import Layout from "../components/layout";

const PageNotFound = ({ pageContext, location }) => {
  const { content } = useStoryblok({ content: null }, location);
  const isEmbedded = location?.search.includes("_storyblok");
  const { settings } = pageContext;
  const { pathname } = location;

  const notFoundTemplate = (
    <section className="section __height_full __cover __theme_primary_background">
      <div className="container __responsive">
        <div className="columns align_center">
          <div className="column size_half">
            <div className="content">
              <h1>404 page</h1>
              <p>Sorry, but {pathname} not exist...</p>
              <a className="action __button __secondary __large" href="/">Back to homepage</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const body =
    content?.body &&
    content.body.map((childBlok) => (
      <DynamicComponent blok={childBlok} key={childBlok._uid} />
    ));

  return isEmbedded && !!content ? (
    <Layout
      location={location}
      settings={settings}
      showBuildStatus={location?.search.includes("_storyblok")}
    >
      {body}
    </Layout>
  ) : (
    notFoundTemplate
  );
};

export default PageNotFound;
