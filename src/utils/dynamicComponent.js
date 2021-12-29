import React from "react";
// Globals
import Page from "../globals/page";
import Project from "../globals/project";
// Bloks
import Section from "../bloks/section";
import Reel from "../bloks/reel";
// Components
import Display from "../components/display";
// Elements
import Link from "../elements/link";
import Button from "../elements/button";
import Heading from "../elements/heading";
import Tale from "../elements/tale";
import Media from "../elements/media";

const Components = {
  page: Page,
  project: Project,
  section: Section,
  reel: Reel,
  heading: Heading,
  flow: Flow,
  tale: Tale,
  link: Link,
  button: Button,
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
