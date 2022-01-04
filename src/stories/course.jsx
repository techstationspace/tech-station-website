import React from "react";
import DynamicComponent from "../utils/dynamicComponent";

export default function Course({ blok }) {
  const content =
    blok.body &&
    blok.body.map((childBlok) => (
      <DynamicComponent blok={childBlok} key={childBlok._uid} />
    ));
  return content;
}
