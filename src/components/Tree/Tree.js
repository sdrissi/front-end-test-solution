import React from "react";
import PropTypes from "prop-types";
import "./style.css";

import TreeElement from "./TreeElement";

Tree.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
}

export default function Tree({ items, children }) {
    return (
        <div className="Tree">
            {
                items && items.map((it) => <TreeElement key={it.id}
                                                        name={it.name}
                                                        items={it.items}
                                                        isExpanded={it.isExpanded}
                                                        highlight={it.highlight}/>)
            }
            {children}
        </div>
    );
}