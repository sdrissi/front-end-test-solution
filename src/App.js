import React, { Component } from 'react';
import './App.css';

import Tree from "./components/Tree";
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

    search = (items, searchTerm, highlight) => {
        if (!items) {
            return [];
        }

        return items.reduce((acc, it) => {
            const res = this.search(it.items, searchTerm, highlight);
            const obj = { ...it };

            const didFindItems = res.length > 0;
            const nameContainsSearchTerm = it.name.match(new RegExp(searchTerm, "i"));

            if (didFindItems) {
                obj.items = res;
                obj.isExpanded = true;
            }

            if (nameContainsSearchTerm && highlight) {
                obj.highlightStr = searchTerm;
            }

            if (didFindItems || nameContainsSearchTerm) {
                acc = acc.concat(obj);
            }

            return acc;
        }, []);
    }

    handleSearch = (searchTerm, highlight) => {
        if (searchTerm && searchTerm.trim().length > 0) {
            this.setState({
                searchResults: this.search([ ...data ], searchTerm, highlight)
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
            <Search onChange={this.handleSearch} placeholder="Search for sectors" timeout={200}/>
            <Tree items={items}/>
        </div>;

    }
}

export default App;
