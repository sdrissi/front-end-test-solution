import React, {Component} from "react";

class TreeElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isExpanded: false
        }
    }

    onClickExpand() {
        console.log("Expand clicked!");
        this.setState({isExpanded: !this.state.isExpanded});
    }

    render() {
        const displaySubItems = this.props.items && this.state.isExpanded;
        return <ul key={this.props.id}>
            <li key={this.props.name} onClick={() => this.onClickExpand()}>{this.props.name}</li>
            {
                 displaySubItems && this.props.items.map(it => {
                     return <TreeElement id={it.id} name={it.name} items={it.items}/>
                 })
            }
        </ul>;
    }
}

export default TreeElement;