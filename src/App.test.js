import React from "react";
import { shallow } from "enzyme";
import App from "./App";
import Search from "./components/Search";
import Tree from "./components/Tree";

jest.mock("./data/sectors", () => {
    return [
        {
            "id": "1",
            "name": "a",
            "items": null
        }
    ];
});

it("renders without crashing", () => {
    shallow(<App/>);
});

it("renders one div with class App", () => {
    const wrapper = shallow(<App/>);

    expect(wrapper.find("div").hasClass("App")).toBe(true);
    expect(wrapper.find("div.App").length).toEqual(1);
});

it("renders App with three children", () => {
    const wrapper = shallow(<App/>);

    expect(wrapper.children().length).toEqual(3);
});

it("renders one Search component on top", () => {
    const wrapper = shallow(<App/>);

    expect(wrapper.find(Search).length).toEqual(1);
    expect(wrapper.find("div.App").childAt(0).type()).toEqual(Search);
});

it("renders one Tree component at the end", () => {
    const wrapper = shallow(<App/>);

    expect(wrapper.find(Tree).length).toEqual(1);
    expect(wrapper.childAt(2).type()).toEqual(Tree);
});

it("renders an hr separating Search and Tree components", () => {
    const wrapper = shallow(<App/>);

    expect(wrapper.childAt(1).type()).toEqual("hr");
});

it("initialized with searchResults state as null", () => {
    const wrapper = shallow(<App/>);

    expect(wrapper.state().searchResults).toEqual(null);
});

it("handles search with non empty searchTerm by calling search function with imported json, searchTerm and highlight value", () => {
    const wrapper = shallow(<App/>);
    const searchTerm = "abc";
    const highlight = true;

    wrapper.instance().search = jest.fn();

    wrapper.instance().handleSearch(searchTerm, highlight);

    expect(wrapper.instance().search).toHaveBeenCalledWith([
        {
            "id": "1",
            "name": "a",
            "items": null
        }
    ], searchTerm, highlight);
    expect(wrapper.state().searchResults).not.toBe(null);
});

it("handles search with empty search term by setting searchResults state to null", () => {
    const wrapper = shallow(<App/>);
    const searchTerm = "";
    const highlight = true;

    wrapper.instance().handleSearch(searchTerm, highlight);

    expect(wrapper.state().searchResults).toBe(null);
});

it("searches searchTerm through items recursively for each item", () => {
    const items = [
        {
            id: "1",
            name: "a",
            items: [
                {
                    id: 2,
                    name: "b",
                    items: [
                        {
                            id: 3,
                            name: "c",
                            items: null
                        }
                    ]
                }
            ]
        }
    ];
    const searchTerm = "b";
    const highlight = false;
    const wrapper = shallow(<App/>);
    const spy = jest.spyOn(wrapper.instance(), "search");

    wrapper.instance().search([ ...items ], searchTerm, highlight);

    expect(spy).toHaveBeenCalledTimes(4);
});

it("searches searchTerm through items and set isExpanded to true and items to search result if match where found in sub items", () => {
    const items = [
        {
            id: "1",
            name: "a",
            items: [
                {
                    id: "2",
                    name: "b",
                    items: [
                        {
                            id: "3",
                            name: "c",
                            items: null
                        }
                    ]
                }
            ]
        }
    ];
    const searchTerm = "c";
    const highlight = false;
    const wrapper = shallow(<App/>);

    const res = wrapper.instance().search([ ...items ], searchTerm, highlight);

    expect(res).toEqual([
        {
            id: "1",
            name: "a",
            isExpanded: true,
            items: [
                {
                    id: "2",
                    name: "b",
                    isExpanded: true,
                    items: [
                        {
                            id: "3",
                            name: "c",
                            items: null
                        }
                    ]
                }
            ]
        }
    ]);
});

it("searches searchTerm through items and set highlightStr to searchTerm if item's name contains searchTerm and highlight is true", () => {
    const items = [
        {
            id: "1",
            name: "abc",
            items: null
        }
    ];
    const searchTerm = "b";
    const highlight = true;
    const wrapper = shallow(<App/>);

    const res = wrapper.instance().search([ ...items ], searchTerm, highlight);

    expect(res).toEqual([
        {
            id: "1",
            name: "abc",
            highlightStr: "b",
            items: null
        }
    ]);
});

it("searches searchTerm through items and return empty array if items is null", () => {
    const items = null;
    const searchTerm = "b";
    const highlight = false;
    const wrapper = shallow(<App/>);

    const res = wrapper.instance().search(items, searchTerm, highlight);

    expect(res).toEqual([]);
});

it("searches searchTerm through items, doesn't mutate items and return a new array", () => {
    const items = [
        {
            id: "1",
            name: "a",
            items: [
                {
                    id: "2",
                    name: "b",
                    items: [
                        {
                            id: "3",
                            name: "c",
                            items: null
                        }
                    ]
                }
            ]
        }
    ];
    const searchTerm = "b";
    const highlight = true;
    const wrapper = shallow(<App/>);

    const res = wrapper.instance().search([ ...items ], searchTerm, highlight);

    expect(items).toEqual(items);
    expect(res).not.toBe(items);
});

it("renders Tree component with items read from json file when searchResults state is null", () => {
    const wrapper = shallow(<App/>);

    wrapper.setState({ searchResults: null });

    expect(wrapper.find(Tree).props().items).toEqual([
        {
            "id": "1",
            "name": "a",
            "items": null
        }
    ]);
});

it("renders Tree component with items from searchResults when searchResults state is not null", () => {
    const wrapper = shallow(<App/>);
    const res = [
        {
            "id": "1",
            "name": "ab",
            "items": null
        },
        {
            "id": "2",
            "name": "b",
            "items": null
        }
    ];

    wrapper.setState({ searchResults: res });

    expect(wrapper.find(Tree).props().items).toEqual(res);
});