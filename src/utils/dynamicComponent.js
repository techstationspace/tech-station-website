import React from "react";
import Section from "../bloks/section";
import Reel from "../components/reel";
import Collection from "../components/collection";
import Columns from "../components/columns";
import Column from "../components/column";
import Text from "../elements/text";
import Media from "../elements/media";
import Action from "../elements/action";
import Icon from "../elements/icon";
import Form from "../components/form";
import Input from "../form/input";
import Select from "../form/select";
import Checkbox from "../form/checkbox";

const Components = {
  section: Section,
  reel: Reel,
  collection: Collection,
  form: Form,
  columns: Columns,
  column: Column,
  text: Text,
  icon: Icon,
  media: Media,
  action: Action,
  input: Input,
  select: Select,
  checkbox: Checkbox,
};

const ComponentNotFound = ({ componentName }) => (
  <div className="component-not-found">
    The component {componentName} has not been created yet.
  </div>
);

const DynamicComponent = (props) => {
  const { blok } = props;
  if (typeof Components[blok.component] !== "undefined") {
    const Component = Components[blok.component];
    return (
      <Component
        blok={blok}
        key={blok._uid}
        parent={props.parent}
        error={props.error}
        setFieldValue={(e) => props.setFieldValue(e)}
        doAction={(e) => props.doAction(e)}
      />
    );
  }
  return blok.component ? (
    <ComponentNotFound componentName={blok.component} />
  ) : null;
};

export default DynamicComponent;
