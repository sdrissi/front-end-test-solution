import React from "react";
import PropTypes from "prop-types";
import "./Tree.css";

import TreeElement from "./TreeElement";

Tree.propTypes = {
    // List of item objects to be render in a TreeView
    items: PropTypes.arrayOf(PropTypes.shape({
        // Shape of the item to be passed to TreeElement component, see propTypes of TreeElement
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.object),
        isExpanded: PropTypes.bool,
        highlightStr: PropTypes.string
    })),
    // List of nodes to be render after items
    children: PropTypes.node
}

export default function Tree({ items, children }) {
    return (
        <ul className="Tree">
            {
                items && items.map((it) => <TreeElement key={it.id}
                                                        name={it.name}
                                                        items={it.items}
                                                        isExpanded={it.isExpanded}
                                                        highlightStr={it.highlightStr}/>)
            }
            {children}
        </ul>
    );
}