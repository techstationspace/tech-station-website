import React from "react"
import Page from "../bloks/page"
import Section from "../components/section";
import Link from "../elements/link";
import Button from "../elements/button";
import Menu from "../elements/menu";

const Components = {
  page: Page,
  section: Section,
  menu: Menu,
  link: Link,
  button: Button,
}

const ComponentNotFound = ({ componentName }) => (
  <div className="component-not-found">
    The component {componentName} has not been created yet.
  </div>
)

const DynamicComponent = ({ blok, parent }) => {
  if (typeof Components[blok.component] !== "undefined") {
    const Component = Components[blok.component]
    return <Component blok={blok} key={blok._uid} parent={parent} />
  }
  return blok.component ? (
    <ComponentNotFound componentName={blok.component} />
  ) : null
}

export default DynamicComponent
