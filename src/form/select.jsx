import React from "react";
import SbEditable from "storyblok-react";
import PropTypes from "prop-types";
import Field from "../form/field";

const Select = ({ blok, error, setFieldValue = () => null }) => {
  const options = blok.options
    .split(",")
    .map((i) => i.split(":").map((i) => i.trim()));

  const selectChange = (event) => {
    setFieldValue({ value: event.target.value, field: blok.id });
  };

  return (
    <SbEditable content={blok} key={blok._uid}>
      <Field label={blok.label} required={blok.required} error={error}>
        <div className="select">
          <select id={blok.id} onChange={(e) => selectChange(e)} placeholder={blok.placeholder}>
            {options.map((option, i) => (
              <option key={i} className="select--option" value={option[1]}>
                {option[0]}
              </option>
            ))}
          </select>
        </div>
      </Field>
    </SbEditable>
  );
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
  error: PropTypes.string,
};

export default Select;
