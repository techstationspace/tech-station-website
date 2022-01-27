import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import StoryblokClient from "storyblok-js-client";
import DynamicComponent from "../utils/dynamicComponent";

const sbClient = new StoryblokClient({
  accessToken: `${process.env.GATSBY_STORY_BLOK}`,
  cache: {
    clear: "auto",
    type: "memory",
  },
});

const Form = ({ blok }) => {
  const [steps, setSteps] = useState([]);
  const _steps = [...steps];
  const [step, setStep] = useState(steps[0]);
  const [fields, setFields] = useState({});
  const _fields = { ...fields };

  useEffect(() => {
    const components = ["input", "checkbox", "select"];
    const getFields = (bloks) => {
      bloks.map((childBlok) => {
        if (childBlok.component === "group") {
          getFields(childBlok.body);
          _steps.push(childBlok.id);
        } else if (components.includes(childBlok.component)) {
          _fields[childBlok.id] = {
            value: null,
            error: "",
            required: childBlok.required,
          };
        }
      });
    };

    getFields(blok.body);

    _steps.length && _steps.push("form");
    _steps.push("success");
    setStep(_steps);
    setFields(_fields);
  }, []);

  const setFieldValue = ({ field, value }) => {
    _fields[field].value = value;
    setFields(_fields);
  };

  const validateFields = () => {
    const validations = Object.keys(fields).map((id) => {
      const field = _fields[id];
      if (field.required && !field.value) {
        field.error = "This field is required";
        return false;
      } else {
        field.error = "";
        return true;
      }
    });
    setFields(_fields);
    return !validations.includes(false);
  };

  const submitForm = (event) => {
    event.preventDefault();
    const isFormValid = validateFields();

    if (isFormValid) {
      console.log("Form is valid");
      setStep("success");
    } else {
      console.log("Check errors");
    }
    console.log(fields);
  };

  let successMessage = sbClient.richTextResolver.render(blok.success);

  if (step === "success") {
    let customMessage = JSON.stringify(successMessage);
    Object.keys(fields).map((field) => {
      const key = "{{" + field + "}}";
      const value = `${fields[field].value}`;
      customMessage = customMessage.replace(key, value);
    });
    successMessage = JSON.parse(customMessage);
  }

  const body =
    blok.body &&
    blok.body.map((childBlok) => {
      return (
        <DynamicComponent
          key={childBlok._uid}
          blok={childBlok}
          error={fields[childBlok.id]?.error || ""}
          setFieldValue={(f) => setFieldValue(f)}
          doAction={(e) => submitForm(e)}
        />
      );
    });

  return (
    <SbEditable key={blok._uid} content={blok}>
      {step !== "success" ? (
        <form id={blok.name} className="form">
          {body}
        </form>
      ) : (
        <div className="success">
          <div
            className="success--message"
            dangerouslySetInnerHTML={{ __html: successMessage }}
          />
          <div className="success--actions">
            <button
              className="action __button __large"
              onClick={() => setStep(steps[0])}
            >
              Continua la navigazione
            </button>
          </div>
        </div>
      )}
    </SbEditable>
  );
};

Form.propTypes = {
  blok: PropTypes.shape({
    name: PropTypes.string,
    body: PropTypes.array,
    settings: PropTypes.array,
    success: PropTypes.object,
  }),
};

export default Form;
