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

it("renders the items as TreeElements when li with class Tree__name is clicked", () => {
    const props = {
        items: [
            {
                id: 1,
                name: "item1"
            }
        ]
    };
    const wrapper = shallow(<TreeElement {...props}/>);
    wrapper.find("li.Tree__name").simulate("click");
    expect(wrapper.state().isExpanded).toBe(true);
    expect(wrapper.find("ul.Tree__element > TreeElement").exists()).toBe(true);
    expect(wrapper.find("ul.Tree__element > TreeElement").length).toEqual(1);
});

it("renders the items as TreeElements when isExpanded prop is true", () => {
    const props = {
        isExpanded: true,
        items: [
            {
                id: 1,
                name: "item1"
            }
        ]
    };
    const wrapper = shallow(<TreeElement {...props}/>);
    expect(wrapper.state().isExpanded).toBe(false);
    expect(wrapper.find("ul.Tree__element > TreeElement").exists()).toBe(true);
    expect(wrapper.find("ul.Tree__element > TreeElement").length).toEqual(1);
});

it("doesn't render the items when li is not clicked and isExpanded prop is false", () => {
    const props = {
        items: [
            {
                id: 1,
                name: "item1"
            }
        ]
    };
    const wrapper = shallow(<TreeElement {...props}/>);
    expect(wrapper.find("ul.Tree__element > TreeElement").exists()).toBe(false);
});

it("renders name prop in a li element with class Tree__name when highlight prop is not provided", () => {
    const props = {
        name: "item1"
    };
    const wrapper = shallow(<TreeElement {...props}/>);
    const nameWrapper = wrapper.find("li.Tree__name");

    expect(nameWrapper.exists()).toBe(true);
    expect(nameWrapper.length).toEqual(1);
    expect(nameWrapper.text()).toEqual(props.name);
});

it("renders name prop in a li element with class Tree__name and wrap string in name matching highlight prop in a span with class Tree__name--highlighted", () => {
    const props = {
        name: "item1",
        highlight: "em"
    };
    const wrapper = shallow(<TreeElement {...props}/>);
    const nameWrapper = wrapper.find("li.Tree__name");

    expect(nameWrapper.text()).toEqual(props.name);
    expect(nameWrapper.find(".Tree__name--highlighted").exists()).toBe(true);
    expect(nameWrapper.find(".Tree__name--highlighted").text()).toEqual(props.highlight);
});


