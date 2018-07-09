import React, {Component} from "react";
import "./style.css";

class Search extends Component {

    handleInputChange(value) {
        this.props.onChange(value);
    }

    render() {
        return <input onChange={(e) => this.handleInputChange(e.target.value)} className="Search" type="text"/>
    }
}

export default Search;