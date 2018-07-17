import React from "react";
import { shallow } from "enzyme";
import App from "./App";

it("renders without crashing", () => {
    shallow(<App/>);
});

it("renders one div with class App", () => {
    const wrapper = shallow(<App/>);

    expect(wrapper.find("div").hasClass("App")).toBe(true);
    expect(wrapper.find("div.App").length).toEqual(1);
});

it("renders a Search component on top", () => {

});

it("renders a Tree component at the end", () => {

});

it("renders an hr separating Search and Tree components", () => {

});

it("initialized with searchResults state as null", () => {

});

it("handles search with searchTerm non empty by calling search function", () => {

});

it("handles search with search term empty by setting searchResults state to null", () => {

});

it("searches searchTerm through items correctly")