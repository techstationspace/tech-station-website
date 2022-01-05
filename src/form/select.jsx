import React from "react";
import PropTypes from "prop-types";
import Field from "../elements/field";

const Select = ({ blok, error }) => {
  const errorMessage = error && blok.error;
  const options = blok.options
    .split(",")
    .map((i) => i.split(":").map((i) => i.trim()));

  const selectChange = (event) => {
    console.log(event);
  };

  return (
    <Field label={blok.label} error={errorMessage}>
      <select className="select" id={blok.id} onChange={(e) => selectChange(e)}>
        {blok.placeholder && (
          <option className="select--placeholder" selected>
            {blok.placeholder}
          </option>
        )}
        {options.map((option) => (
          <option className="select--option" value={option[0]}>
            {option[1]}
          </option>
        ))}
      </select>
    </Field>
  );
};

Select.defaultProps = {
  blok: {
    label: "Select label",
    placeholder: "Select an option",
    options: "key one: 1, key two: 2",
    required: false,
    error: "Select error message",
  },
};

Select.propTypes = {
  blok: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    options: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.string,
  }),
  error: PropTypes.bool,
};

export default Select;
