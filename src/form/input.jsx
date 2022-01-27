import React, { useState } from "react";
import PropTypes from "prop-types";
import SbEditable from "storyblok-react";
import Field from "../form/field";

const re = {
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  tel: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
  password: /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
};

const Input = ({ blok, error, value, setFieldValue = () => null }) => {
  const [inputValue, setInputValue] = useState(value || "");
  const [inputError, setInputError] = useState("");
  const [passwordVisible, setPasswordVisibity] = useState(
    blok.type === "password"
  );

  const passwordMessage =
    "Minimum eight characters, at least one letter, one number and one special character";

  const validateInput = () => {
    console.log(inputValue);
    if (!!inputValue) {
      if (Object.keys(re).includes(blok.type)) {
        if (String(inputValue).toLowerCase().match(re[blok.type])) {
          setFieldValue({ value: inputValue, field: blok.id });
          setInputError("");
        } else {
          setInputError(blok.error);
        }
      } else {
        setFieldValue({ value: inputValue, field: blok.id });
        setInputError("");
      }
    }
  };

  const _input = () => (
    <input
      id={blok.id}
      type={passwordVisible ? blok.type : "text"}
      className={`input--${blok.type}`}
      placeholder={blok.placeholder}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={() => validateInput()}
      minLength={blok.type === "password" ? "8" : ""}
    />
  );

  const _textArea = () => (
    <textarea
      id={blok.id}
      rows={5}
      placeholder={blok.placeholder}
      className="input--text-area"
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={() => validateInput()}
    />
  );

  return (
    <SbEditable content={blok} key={blok._uid}>
      <Field
        label={blok.label}
        required={blok.required}
        error={inputError || error}
        info={blok.type === "password" ? passwordMessage : ""}
      >
        <div className="input">
          {blok.type === "message" ? _textArea() : _input()}
          {blok.type === "password" && (
            <span
              className="input--icon icon __small"
              onClick={() => setPasswordVisibity(!passwordVisible)}
            >
              {`visibility${passwordVisible ? "_off" : ""}`}
            </span>
          )}
        </div>
      </Field>
    </SbEditable>
  );
};

Input.propTypes = {
  blok: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(["text", "email", "password", "tel", "message"]),
    required: PropTypes.bool,
    error: PropTypes.string,
  }),
  error: PropTypes.string,
  value: PropTypes.string,
};

export default Input;
