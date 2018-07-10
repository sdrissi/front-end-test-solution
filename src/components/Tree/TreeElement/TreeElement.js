import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.css";

export default class TreeElement extends Component {
    state = { isExpanded: false }

    static propTypes = {
        // The name of the tree element
        name: PropTypes.string,
        // The list of items to display when the tree element is clicked
        items: PropTypes.arrayOf(PropTypes.object),
        // Specify if the items should be displayed
        isExpanded: PropTypes.bool,
        // Text to highlight in name
        highlight: PropTypes.string,

    };

    handleClick = () => {
        this.setState({ isExpanded: !this.state.isExpanded });
    }

    render() {
        const { name, items, isExpanded, highlight } = this.props
        let match;

        if (highlight) {
            const pattern = `(.*)(${highlight})(.*)`;
            const reg = new RegExp(pattern, "g");
            match = reg.exec(name);
        }

        const displaySubItems = items && (this.state.isExpanded || isExpanded);

        return <ul className="Tree__element">
            <li className="Tree__name" onClick={this.handleClick}>
                {
                    highlight && match ?
                        <span>{match[1]}<span className="Tree__name--highlighted">{match[2]}</span>{match[3]}</span>
                        : name
                }
            </li>
            {
                displaySubItems && items.map(it => <TreeElement key={it.id}
                                                                name={it.name}
                                                                items={it.items}
                                                                isExpanded={it.isExpanded}
                                                                highlight={it.highlight}/>)
            }
        </ul>;
    }
}