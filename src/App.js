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

    search = (items, searchTerm) => {
        if (!items) {
            return [];
        }

        return items.reduce((acc, it) => {
            const res = this.search(it.items, searchTerm);
            const obj = { ...it };

            const foundItems = res.length > 0;
            const nameContainsSearchTerm = it.name.includes(searchTerm);

            if (foundItems) {
                obj.items = res;
                obj.isExpanded = true;
            }

            if (nameContainsSearchTerm) {
                obj.highlight = searchTerm;
                obj.isExpanded = obj.isExpanded || false;
            }

            if (foundItems || nameContainsSearchTerm) {
                acc = acc.concat(obj);
            }

            return acc;
        }, []);
    }

    handleSearch = (searchTerm) => {
        if (searchTerm && searchTerm.trim().length > 0) {
            this.setState({
                searchResults: this.search([ ...data ], searchTerm)
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
            <Search onChange={this.handleSearch} placeholder="Search for sectors"/>
            <Tree items={items}/>
        </div>;

    }
}

export default App;
