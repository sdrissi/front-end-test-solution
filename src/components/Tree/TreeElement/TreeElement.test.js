import React from "react";
import { shallow } from "enzyme";
import TreeElement from "./TreeElement";

it("should render without crashing", () => {
    shallow(<TreeElement/>);
});

it("should display one unordered list with class Tree__element", () => {
    const wrapper = shallow(<TreeElement/>);
    expect(wrapper.find("ul").hasClass("Tree__element")).toBe(true);
    expect(wrapper.find("ul.Tree__element").length).toEqual(1);
});