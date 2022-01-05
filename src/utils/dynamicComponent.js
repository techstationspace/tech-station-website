import React from "react";
import Section from "../bloks/section";
import Display from "../components/display";
import Reel from "../components/reel";
import Collection from "../components/collection";
import Heading from "../elements/heading";
import Tale from "../elements/tale";
import Media from "../elements/media";
import Action from "../elements/action";

const Components = {
  section: Section,
  display: Display,
  reel: Reel,
  collection: Collection,
  heading: Heading,
  tale: Tale,
  media: Media,
  action: Action,
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
