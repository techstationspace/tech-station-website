import { useEffect, useState } from "react";
import StoryblokClient from "storyblok-js-client";

const sbClient = new StoryblokClient({
  accessToken: `${process.env.STORY_BLOK}`,
  cache: {
    clear: "auto",
    type: "memory",
  },
});

export default function useStoryblok(originalStory, location) {
  let [story, setStory] = useState(originalStory);

  if (story && typeof story.content === "string") {
    story.content = JSON.parse(story.content);
  }

  function initEventListeners() {
    const { StoryblokBridge } = window;

    if (typeof StoryblokBridge !== "undefined") {
      const storyblokInstance = new StoryblokBridge();

      storyblokInstance.on(["published", "change"], (event) => {
        window.location.reload(true);
      });

      storyblokInstance.on("input", (event) => {
        setStory(event.story);
      });

      storyblokInstance.on("enterEditmode", (event) => {
        sbClient
          .get(`cdn/stories/${event.storyId}`, {
            version: "draft",
          })
          .then(({ data }) => {
            if (data.story) {
              setStory(data.story);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      });
    }
  }

  function addBridge(callBack) {
    const existingScript = document.getElementById("storyblokBridge");
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = `//app.storyblok.com/f/storyblok-v2-latest.js`;
      script.id = "storyblokBridge";
      document.body.appendChild(script);
      script.onload = () => {
        callBack();
      };
    } else {
      callBack();
    }
  }

  useEffect(() => {
    if (location?.search.includes("_storyblok")) {
      addBridge(initEventListeners);
    }
  }, []);

  return story;
}
