import React from "react";
import "./style.css";

class Tree extends React.Component {
    render() {
        return <div className="Tree">
            {this.props.children}
        </div>;
    }
}

export default Tree;