import React, {Component} from "react";
import "./style.css";

class TreeElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false
        }
    }

    onClickExpand() {
        this.setState({isExpanded: !this.state.isExpanded});
    }

    render() {
        const {name, items, isExpanded, highlight} = this.props.item;
        let match;

        if (highlight) {
            const pattern = `(.*)(${highlight})(.*)`;
            const reg = new RegExp(pattern, "g");
            match = reg.exec(name);
        }

        const displaySubItems = items && (this.state.isExpanded || isExpanded);

        return <ul className="Tree__element">
            <li onClick={() => this.onClickExpand()}>
                {
                    highlight && match ?
                        <span>{match[1]}<span className="highlighted">{match[2]}</span>{match[3]}</span>
                        : name
                }
            </li>
            {displaySubItems && items.map(it => <TreeElement key={it.id} item={it}/>)}
        </ul>;
    }


}

export default TreeElement;