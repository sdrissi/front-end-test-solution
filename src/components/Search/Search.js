import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.css";

export default class Search extends Component {
    state = { highlight: true };
    input = React.createRef();

    static propTypes = {
        // Callback for input change event
        onChange: PropTypes.func.isRequired,
        // set timeout on onChange
        timeout: PropTypes.number,
        // Placeholder of input component
        placeholder: PropTypes.string
    };

    handleChange = (e) => {
        const { onChange, timeout } = this.props;
        const { highlight } = this.state;
        const newValue = e.target.value;

        if (timeout) {
            setTimeout(onChange, timeout, newValue, highlight);
        } else {
            onChange(newValue, highlight);
        }
    }

    handleClick = () => {
        const { onChange } = this.props;

        this.setState(prevState => ({
            highlight: !prevState.highlight
        }), () => onChange(this.input.current.value, this.state.highlight));
    }

    render() {
        const { placeholder } = this.props;
        const { highlight } = this.state;
        return (
            <div className="Search">
                <input className="Search__input"
                       type="text"
                       onChange={this.handleChange}
                       placeholder={placeholder}
                       ref={this.input}/>
                <span className={`Search__button ${highlight ? "Search__button--isActive" : ""}`}
                      onClick={this.handleClick}>Highlight</span>
            </div>
        );
    }
}