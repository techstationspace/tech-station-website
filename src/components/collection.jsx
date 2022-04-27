import React from "react";
import PropTypes from "prop-types";
import DynamicComponent from "../utils/dynamicComponent";
import { useStaticQuery, graphql } from "gatsby";
import StoryblokClient from "storyblok-js-client";
import Icon from "../elements/icon";

const sbClient = new StoryblokClient({
  accessToken: `${process.env.GATSBY_STORY_BLOK}`,
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
            full_slug
            uuid
            name
            content
          }
        }
      }
      coaches: allStoryblokEntry(filter: { field_component: { eq: "coach" } }) {
        edges {
          node {
            full_slug
            uuid
            name
            content
          }
        }
      }
      courses: allStoryblokEntry(
        filter: { field_component: { eq: "course" } }
      ) {
        edges {
          node {
            full_slug
            uuid
            name
            content
          }
        }
      }
    }
  `);

  const items = [];
  let Template;
  const collectionClasses = ["collection", `__${blok.type}`];
  let dataType = undefined;
  if (!!blok.projects.length) {
    dataType = "projects";
  } else if (!!blok.coaches.length) {
    dataType = "coaches";
  } else if (!!blok.courses.length) {
    dataType = "courses";
  }

  const templateTypes = {
    coaches: Coach,
    projects: Project,
    courses: Course,
  };

  if (!!dataType) {
    blok[dataType].map((id) =>
      queryData[dataType].edges.map(
        ({ node }) =>
          node.uuid === id &&
          items.push({
            id: node.uuid,
            content: JSON.parse(node.content),
            link: node.full_slug,
          })
      )
    );

    Template = templateTypes[dataType];

    return (
      <div className={collectionClasses.join(" ")}>
        {!!items.length &&
          items.map((item) => (
            <div
              key={item.id}
              className="item"
              style={{ order: item.content.order || items.length }}
            >
              <Template data={item.content} link={item.link} />
            </div>
          ))}
      </div>
    );
  }
};

const Coach = ({ data }) => {
  const description = sbClient.richTextResolver.render(data.description);
  const links =
    data.links &&
    data.links.map((childBlok) => (
      <DynamicComponent blok={childBlok} key={childBlok._uid} />
    ));

  return (
    <div className="collection--coach">
      <img
        className="collection--coach-image"
        src={data.image.filename}
        alt={data.image.alt}
      />
      <div className="collection--coach-content">
        <div className="collection--coach-heading">
          <h6 className="collection--coach-title">{data.full_name}</h6>
          <small className="collection--coach-subtitle">{data.subject}</small>
        </div>
        <div
          className="collection--coach-description hidden__mobile"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        {!!data.links.length && (
          <div className="collection--coach-link">{links}</div>
        )}
      </div>
    </div>
  );
};

const Project = ({ data }) => {
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

const Course = ({ data, link }) => {

  const startDate =
    data?.start && new Date(data.start.replace(/-/g, "/")).toLocaleDateString();
  const endtDate =
    data?.end && new Date(data.end.replace(/-/g, "/")).toLocaleDateString();

  const background = { backgroundImage: `url(${data.image?.filename})` };
  console.log(background);
  return (
    <div className="collection--course">
      <div className="collection--course-content">
        <h5 className="collection--course-title">{data.title}</h5>
        {!!startDate && (
          <p>
            <Icon blok={{ name: "event" }} />
            <span>{startDate}</span>-{!!endtDate && <span>{endtDate}</span>}
          </p>
        )}
        {!!data.location && (
          <p>
            <Icon blok={{ name: "place" }} /> {data.location}
          </p>
        )}
        <a href={link} className="action __button __secondary __large">
          Vai al corso
        </a>
      </div>
      <div className="collection--course-background" style={background} />
    </div>
  );
};

Collection.propTypes = {
  blok: PropTypes.shape({
    id: PropTypes.string,
  }),
};

export default Collection;
