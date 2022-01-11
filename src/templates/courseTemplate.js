import React from "react";
import useStoryblok from "../utils/storyblok";
import DynamicComponent from "../utils/dynamicComponent";
import Layout from "../components/layout";
import Icon from "../elements/icon";
import Action from "../elements/action";

const CourseIndex = ({ pageContext, location }) => {
  const { content } = useStoryblok(pageContext.story, location);
  const { settings } = pageContext;

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

  const actionProps = {
    component: "action",
    text: "iscriviti al corso",
    style: "primary",
    type: "button",
    size: "large",
    url: {
      cached_url: "#subscribe",
    },
  };

  const cover = (
    <section id={settings.slud} className="cover" style={coverStyles}>
      <div className="cover--wrapper container__responsive">
        <h1 className="cover--title">{content.title}</h1>
        <div className="cover--box">
          <h5>{content.title}</h5>
          {!!content.start && (
            <p className="cover--label">
              <Icon name="calendar-date" />
              <span>{new Date(content.start).toLocaleDateString("it-IT")}</span>
              -
              {!!content.end && (
                <span>{new Date(content.end).toLocaleDateString("it-IT")}</span>
              )}
            </p>
          )}
          {!!content.location && (
            <p className="cover--label">
              <Icon name="map-location" /> {content.location}
            </p>
          )}
          <Action blok={actionProps} />
        </div>
      </div>
    </section>
  );

  return (
    <Layout location={location} settings={settings}>
      {cover}
      {body}
    </Layout>
  );
};

export default CourseIndex;
