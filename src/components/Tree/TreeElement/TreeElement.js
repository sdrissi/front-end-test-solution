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
        const displaySubItems = (this.props.items && this.state.isExpanded) || (this.props.items && this.props.isExpanded);
        return <ul className="Tree__element">
            <li onClick={() => this.onClickExpand()}>{this.props.name}</li>
            {
                 displaySubItems && this.props.items.map(it => {
                     return <TreeElement key={it.id} name={it.name} items={it.items} isExpanded={it.isExpanded}/>
                 })
            }
        </ul>;
    }
}

export default TreeElement;