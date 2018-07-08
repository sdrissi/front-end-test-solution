import React, {Component} from 'react';
import './App.css';
import Tree, {TreeElement} from "./components/Tree";
import data from "./data/sectors";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: data,
            expanded: []
        };

    }

    render() {
        return <Tree>
            {
                this.state.items.map(it => {
                    return <TreeElement key={it.id} name={it.name} items={it.items} />;
                })
            }
        </Tree>
    }
}

export default App;
