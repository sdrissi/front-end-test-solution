import React, { Component } from "react";
import PropTypes from "prop-types";
import "./TreeViewElement.css";

export default class TreeViewElement extends Component {
    state = { isExpanded: false }

    static propTypes = {
        // The name of the tree view element
        name: PropTypes.string.isRequired,
        // The list of items to display when the tree view element is clicked
        items: PropTypes.arrayOf(PropTypes.object),
        // Specify if the items should be displayed
        isExpanded: PropTypes.bool,
        // String to highlight in name
        highlightStr: PropTypes.string
    };

    handleClick = () => {
        this.setState({ isExpanded: !this.state.isExpanded });
    }

    render() {
        const {
            name,
            items,
            isExpanded,
            highlightStr
        } = this.props;

        let match;

        if (highlightStr) {
            const pattern = `(.*)(${highlightStr})(.*)`;
            const reg = new RegExp(pattern, "gi");
            match = reg.exec(name);
        }

        const hasItems = items && items.length > 0;
        const displaySubItems = hasItems && (this.state.isExpanded || isExpanded);

        let className = "TreeViewElement";
        if (displaySubItems) {
            className += " TreeViewElement--isExpanded";
        } else if (hasItems) {
            className += " TreeViewElement--hasItems";
        }

        return <li className={className}>
            {
                highlightStr && match ?
                    <span className="TreeViewElement__name" onClick={this.handleClick}>
                        {match[ 1 ]}<span className="TreeViewElement__name--highlighted">{match[ 2 ]}</span>{match[ 3 ]}
                    </span> :
                    <span className="TreeViewElement__name" onClick={this.handleClick}>{name}</span>
            }

            {
                displaySubItems && <ul>
                    {
                        items.map(it => <TreeViewElement key={it.id}
                                                         name={it.name}
                                                         items={it.items}
                                                         isExpanded={it.isExpanded}
                                                         highlightStr={it.highlightStr}/>)
                    }
                </ul>
            }
        </li>;
    }
}