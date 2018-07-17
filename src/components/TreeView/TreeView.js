import React from "react";
import PropTypes from "prop-types";
import "./TreeView.css";

import TreeViewElement from "./TreeViewElement";

TreeView.propTypes = {
    // List of item objects to be render in a TreeView
    items: PropTypes.arrayOf(PropTypes.shape({
        // Shape of the item to be passed to TreeViewElement component, see propTypes of TreeViewElement
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        items: PropTypes.arrayOf(PropTypes.object),
        isExpanded: PropTypes.bool,
        highlightStr: PropTypes.string
    })),
    // List of nodes to be render after items
    children: PropTypes.node
}

export default function TreeView({ items, children }) {
    return (
        <ul className="TreeView">
            {
                items && items.map((it) => <TreeViewElement key={it.id}
                                                            name={it.name}
                                                            items={it.items}
                                                            isExpanded={it.isExpanded}
                                                            highlightStr={it.highlightStr}/>)
            }
            {children}
        </ul>
    );
}