import React from "react";
// Stories
import Page from "../stories/page";
import Project from "../stories/project";
// Bloks
import Section from "../bloks/section";
// Components
import Display from "../components/display";
import Reel from "../components/reel";
// Elements
import Heading from "../elements/heading";
import Tale from "../elements/tale";
import Media from "../elements/media";
import Action from "../elements/action";

const Components = {
  page: Page,
  project: Project,
  section: Section,
  reel: Reel,
  heading: Heading,
  display: Display,
  tale: Tale,
  action: Action,
  media: Media,
};

const ComponentNotFound = ({ componentName }) => (
  <div className="component-not-found">
    The component {componentName} has not been created yet.
  </div>
);

const DynamicComponent = ({ blok, parent }) => {
  if (typeof Components[blok.component] !== "undefined") {
    const Component = Components[blok.component];
    return <Component blok={blok} key={blok._uid} parent={parent} />;
  }
  return blok.component ? (
    <ComponentNotFound componentName={blok.component} />
  ) : null;
};

export default DynamicComponent;
