import React from "react";
import PropTypes from "prop-types";
import "./style.css";

Search.propTypes = {
    // Callback for input change event
    onChange: PropTypes.func.isRequired,
    // set timeout on onChange
    timeout: PropTypes.number,
    // Placeholder of input component
    placeholder: PropTypes.string
};

export default function Search({ onChange, timeout, placeholder }) {

    const handleChange = (e) => {
        const newValue = e.target.value;
        if (timeout) {
            setTimeout(onChange, timeout, newValue);
        } else {
            onChange(newValue);
        }
    };

    return (
        <input className="Search"
               type="text"
               onChange={handleChange}
               placeholder={placeholder}/>
    );
}