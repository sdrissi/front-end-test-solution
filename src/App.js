import React, {Component} from 'react';
import './App.css';

import Tree, {TreeElement} from "./components/Tree";
import Search from "./components/Search";

import data from "./data/sectors";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: data,
            searchResults: null
        };

    }

    search(searchTerm, items) {
        return items.reduce((acc, it) => {
            if (it.items) {
                const res = this.search(searchTerm, it.items);
                if (res && res.length > 0) {
                    return acc.concat({...it, items: res, isExpanded: true});
                }
            }

            if (it.name.includes(searchTerm)) {
                return acc.concat({...it, isExpanded: true});
            }

            return acc;
        }, []);
    }

    handleSearch(searchTerm) {
        if (searchTerm && searchTerm.trim().length > 0) {
            this.setState({
                searchResults: this.search(searchTerm, [...data])
            });
        } else {
            this.setState({
                searchResults: null
            });
        }

    }

    render() {
        const items = this.state.searchResults ? this.state.searchResults : this.state.items;
        return <div>
            <Search onChange={(searchTerm) => this.handleSearch(searchTerm)}/>
            <Tree className="Tree">
                {
                    items.map(it => {
                        return <TreeElement key={it.id} name={it.name} items={it.items} isExpanded={it.isExpanded}/>;
                    })
                }
            </Tree>
        </div>;

    }
}

export default App;
