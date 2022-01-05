import React from "react";
import PropTypes from "prop-types";
import DynamicComponent from "../utils/dynamicComponent";
import { useStaticQuery, graphql } from "gatsby";
import StoryblokClient from "storyblok-js-client";

const sbClient = new StoryblokClient({
  accessToken: `${process.env.STORY_BLOK}`,
  cache: {
    clear: "auto",
    type: "memory",
  },
});

const Collection = ({ blok }) => {
  const queryData = useStaticQuery(graphql`
    query {
      projects: allStoryblokEntry(
        filter: { field_component: { eq: "project" } }
      ) {
        edges {
          node {
            uuid
            name
            content
          }
        }
      }
      coaches: allStoryblokEntry(filter: { field_component: { eq: "coach" } }) {
        edges {
          node {
            uuid
            name
            content
          }
        }
      }
    }
  `);

  const dataType = !!blok.projects.length ? "projects" : "coaches";
  const items = [];

  blok[dataType].map((id) =>
    queryData[dataType].edges.map(
      ({ node }) =>
        node.uuid === id &&
        items.push({ id: node.uuid, content: JSON.parse(node.content) })
    )
  );

  const templateTypes = {
    coaches: Coach,
    projects: Project,
  };
  const Template = templateTypes[dataType];

  const collectionClasses = ["collection", `__${blok.type}`];
  return (
    <div className={collectionClasses.join(" ")}>
      {!!items.length &&
        items.map((item) => <Template key={item.id} data={item.content} />)}
    </div>
  );
};

const Coach = ({ data }) => {
  const description = sbClient.richTextResolver.render(data.description);
  const links =
    data.links &&
    data.links.map((childBlok) => (
      <DynamicComponent blok={childBlok} key={childBlok._uid} />
    ));

  return (
    <div className="collection--coach ">
      <img
        className="collection--coach-image"
        src={data.image.filename}
        alt={data.image.alt}
      />
      <div className="collection--coach-content">
        <h6 className="collection--coach-title">{data.full_name}</h6>
        <small className="collection--coach-subtitle">{data.subject}</small>
        {description}
        <div className="collection--coach-link">{links}</div>
      </div>
    </div>
  );
};

const Project = ({ data }) => {
  // console.log(data);
  const body =
    data.body &&
    data.body.map(
      (childBlok) =>
        !!childBlok.preview && (
          <DynamicComponent blok={childBlok} key={childBlok._uid} />
        )
    );
  return <div className="collection--project">{body}</div>;
};

Collection.propTypes = {
  blok: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default Collection;
