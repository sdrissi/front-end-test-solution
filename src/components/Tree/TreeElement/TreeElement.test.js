import React from "react";
import { shallow } from "enzyme";
import TreeElement from "./TreeElement";

it("renders without crashing", () => {
    shallow(<TreeElement/>);
});

it("renders one ul with class Tree__element", () => {
    const wrapper = shallow(<TreeElement/>);
    expect(wrapper.find("ul").hasClass("Tree__element")).toBe(true);
    expect(wrapper.find("ul.Tree__element").length).toEqual(1);
});

it("renders the items as TreeElements when li is clicked", () => {

});

it("renders the items as TreeElements when isExpanded prop is true", () => {

});

it("doesn't render the items when li is not clicked and isExpanded prop is false", () => {

});

it("renders name prop in a li element with class Tree__name when highlight prop is not provided", () => {

});

it("renders name prop in a span when highlight prop is provided and renders highlight prop in a span with class Tree__name--highlighted", () => {

});


