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
        const {
            name,
            items,
            isExpanded,
            highlight
        } = this.props;

        let match;

        if (highlight) {
            const pattern = `(.*)(${highlight})(.*)`;
            const reg = new RegExp(pattern, "g");
            match = reg.exec(name);
        }

        const hasItems = items && items.length > 0;
        const displaySubItems = hasItems && (this.state.isExpanded || isExpanded);

        return <li
            className={`TreeElement ${hasItems && !displaySubItems && "TreeElement--hasItems"} ${displaySubItems && "TreeElement--isExpanded"}`}>

            {
                highlight && match ?
                    <span className="TreeElement__name" onClick={this.handleClick}>
                        {match[ 1 ]}<span className="TreeElement__name--highlighted">{match[ 2 ]}</span>{match[ 3 ]}
                    </span> :
                    <span className="TreeElement__name" onClick={this.handleClick}>{name}</span>
            }
            
            {
                displaySubItems && <ul>
                    {
                        items.map(it => <TreeElement key={it.id}
                                                     name={it.name}
                                                     items={it.items}
                                                     isExpanded={it.isExpanded}
                                                     highlight={it.highlight}/>)
                    }
                </ul>
            }
        </li>;
    }
}