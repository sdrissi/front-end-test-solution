import React from "react";
import "./style.css";

import TreeElement from "./TreeElement";

class Tree extends React.Component {
    render() {
        const {items} = this.props;
        return <div className="Tree">
            {
                items && items.map(it => <TreeElement key={it.id} item={it}/>)
            }
            {this.props.children}
        </div>;
    }
}

export default Tree;