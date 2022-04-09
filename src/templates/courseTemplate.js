import React from "react";
import useStoryblok from "../utils/storyblok";
import DynamicComponent from "../utils/dynamicComponent";
import Layout from "../components/layout";
import Icon from "../elements/icon";
import Action from "../elements/action";

const CourseIndex = ({ pageContext, location }) => {
  const { content } = useStoryblok(pageContext.story, location);
  const { settings } = pageContext;

  const preview =
    content.preview &&
    content.preview.map((childBlok) => (
      <DynamicComponent blok={childBlok} key={childBlok._uid} />
    ));

  const body =
    content.body &&
    content.body.map((childBlok) => (
      <DynamicComponent blok={childBlok} key={childBlok._uid} />
    ));

  const coverStyles = {
    backgroundImage: content.image?.filename
      ? `url(${content.image.filename})`
      : "",
  };
  const startDate = new Date(content.start.replace(/-/g, "/")).toLocaleDateString();
  const endtDate = new Date(content.end.replace(/-/g, "/")).toLocaleDateString();

  console.log(startDate, endtDate);

  const cover = (
    <section id={settings.slud} className="cover" style={coverStyles}>
      <div className="cover--wrapper container __responsive">
        <div className="cover--preview">{preview}</div>
        <div className="cover--box">
          <h5>{content.title}</h5>
          {!!content.start && (
            <p className="cover--label">
              <Icon blok={{ name: "event" }} />
              <span>{startDate}</span>-
              {!!content.end && <span>{endtDate}</span>}
            </p>
          )}
          {!!content.location && (
            <p className="cover--label">
              <Icon blok={{ name: "place" }} /> {content.location}
            </p>
          )}
          {!!content?.subscribe && <Action blok={content?.subscribe[0]} />}
        </div>
      </div>
    </section>
  );

  return (
    <Layout
      location={location}
      settings={settings}
      showBuildStatus={location?.search.includes("_storyblok")}
    >
      {cover}
      {body}
    </Layout>
  );
};

export default CourseIndex;
