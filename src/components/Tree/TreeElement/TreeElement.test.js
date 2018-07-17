import React from "react";
import { shallow } from "enzyme";
import TreeElement from "./TreeElement";

const requiredProps = {
    id: "1",
    name: "item1"
}

it("renders without crashing", () => {
    shallow(<TreeElement {...requiredProps}/>);
});

it("renders one li with class TreeElement", () => {
    const wrapper = shallow(<TreeElement {...requiredProps}/>);
    expect(wrapper.find("li").hasClass("TreeElement")).toBe(true);
    expect(wrapper.find("li.TreeElement").length).toEqual(1);
});

it("renders the items as TreeElements in a ul when span with class TreeElement__name is clicked", () => {
    const props = {
        ...requiredProps,
        items: [
            {
                id: "1",
                name: "item1"
            }
        ]
    };
    const wrapper = shallow(<TreeElement {...props}/>);
    wrapper.find("span.TreeElement__name").simulate("click");
    expect(wrapper.state().isExpanded).toBe(true);
    expect(wrapper.find("li.TreeElement > ul > TreeElement").exists()).toBe(true);
    expect(wrapper.find("li.TreeElement > ul > TreeElement").length).toEqual(1);
});

it("renders the items as TreeElements in a ul when isExpanded prop is true", () => {
    const props = {
        ...requiredProps,
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
    expect(wrapper.find("li.TreeElement > ul > TreeElement").exists()).toBe(true);
    expect(wrapper.find("li.TreeElement > ul > TreeElement").length).toEqual(1);
});

it("doesn't render the items when li is not clicked and isExpanded prop is false", () => {
    const props = {
        ...requiredProps,
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

it("renders name prop in a span element with class TreeElement__name when highlight prop is not provided", () => {
    const props = {
        name: "item1"
    };
    const wrapper = shallow(<TreeElement {...props}/>);
    const nameWrapper = wrapper.find("span.TreeElement__name");

    expect(nameWrapper.exists()).toBe(true);
    expect(nameWrapper.length).toEqual(1);
    expect(nameWrapper.text()).toEqual(props.name);
});

it("renders name prop in a span element with class TreeElement__name and wrap string in name matching highlight prop in a span with class TreeElement__name--highlighted", () => {
    const props = {
        name: "item1",
        highlightStr: "em"
    };
    const wrapper = shallow(<TreeElement {...props}/>);
    const nameWrapper = wrapper.find("span.TreeElement__name");

    expect(nameWrapper.text()).toEqual(props.name);
    expect(nameWrapper.find("span.TreeElement__name--highlighted").exists()).toBe(true);
    expect(nameWrapper.find("span.TreeElement__name--highlighted").text()).toEqual(props.highlightStr);
});


