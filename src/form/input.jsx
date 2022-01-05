import React from "react";
import PropTypes from "prop-types";
import Field from "../form/field";

const Input = ({ blok, error }) => {
  const errorMessage = error && blok.error;

  const inputChange = (event) => {
    console.log(event);
  };

  return (
    <Field label={blok.label} error={errorMessage}>
      <input
        id={blok.id}
        type={blok.type}
        placeholder={blok.placeholder}
        onChange={(e) => inputChange(e)}
      />
    </Field>
  );
};

Input.defaultProps = {
  blok: {
    id: "input-id",
    label: "Input label",
    placeholder: "Input placeholder",
    type: "text",
    required: false,
    error: "Input error message",
  },
};

Input.propTypes = {
  blok: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    type: PropTypes.oneOf(["text", "email", "password", "tel"]),
    required: PropTypes.bool,
    error: PropTypes.string,
  }),
  error: PropTypes.bool,
};

export default Input;
