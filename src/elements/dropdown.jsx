import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";

const Dropdown = ({ text, list, styles }) => {
  const ref = useRef(null);
  const [_visibility, setVisibility] = useState(false);

  const dropdownClasses = [!!styles ? styles : "", "dropdown"].join(" ");

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setVisibility(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const afterChange = (event) => {
    setVisibility(false);
  };

  return (
    <div ref={ref} className={dropdownClasses}>
      <button
        className="dropdown--button"
        onClick={() => setVisibility(!_visibility)}
      >
        {text}
      </button>
      {list.length > 1 && (
        <nav className={`dropdown--list ${_visibility ? "active" : ""}`}>
          {list.map((item, i) => (
            <a
              className="dropdown--item"
              key={i}
              href={item.url}
              onClick={(e) => afterChange(e)}
            >
              {item.text}
            </a>
          ))}
        </nav>
      )}
    </div>
  );
};

Dropdown.propTypes = {
  text: PropTypes.string,
  list: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
};

export default Dropdown;
