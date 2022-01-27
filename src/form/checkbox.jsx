import React from "react";
import SbEditable from "storyblok-react";
import PropTypes from "prop-types";

const Checkbox = ({ blok, error, checked, setFieldValue = () => null }) => {
  console.log(error);
  const fieldClasses = ["field"];
  blok.required && fieldClasses.push("__required");
  const checkboxChange = (event) => {
    setFieldValue({ value: event.target.checked, field: blok.id });
  };

  return (
    <SbEditable content={blok} key={blok._uid}>
      <div className={fieldClasses.join(" ")}>
        <div className="checkbox">
          <input
            id={blok.id}
            name={blok.id}
            type="checkbox"
            checked={checked}
            onChange={(e) => checkboxChange(e)}
          />
          <label htmlFor={blok.id} className="field--label">
            <a className="field--link" href={blok.link} target="_blank">
              {blok.label}
            </a>
          </label>
        </div>
        {error && <p className="field--error">{error}</p>}
      </div>
    </SbEditable>
  );
};

Checkbox.propTypes = {
  blok: PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.string,
  }),
  error: PropTypes.string,
  checked: PropTypes.bool,
};

export default Checkbox;
