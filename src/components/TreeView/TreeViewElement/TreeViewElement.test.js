import React from "react";
import { shallow } from "enzyme";
import TreeViewElement from "./TreeViewElement";

const requiredProps = {
    id: "1",
    name: "item1"
}

it("renders without crashing", () => {
    shallow(<TreeViewElement {...requiredProps}/>);
});

it("renders one li with class TreeViewElement", () => {
    const wrapper = shallow(<TreeViewElement {...requiredProps}/>);
    expect(wrapper.find("li").hasClass("TreeViewElement")).toBe(true);
    expect(wrapper.find("li.TreeViewElement").length).toEqual(1);
});

it("renders the items as TreeViewElements in a ul when span with class TreeViewElement__name is clicked", () => {
    const props = {
        ...requiredProps,
        items: [
            {
                id: "1",
                name: "item1"
            }
        ]
    };
    const wrapper = shallow(<TreeViewElement {...props}/>);
    wrapper.find("span.TreeViewElement__name").simulate("click");
    expect(wrapper.state().isExpanded).toBe(true);
    expect(wrapper.find("li.TreeViewElement > ul > TreeViewElement").exists()).toBe(true);
    expect(wrapper.find("li.TreeViewElement > ul > TreeViewElement").length).toEqual(1);
});

it("renders the items as TreeViewElements in a ul when isExpanded prop is true", () => {
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
    const wrapper = shallow(<TreeViewElement {...props}/>);
    expect(wrapper.state().isExpanded).toBe(false);
    expect(wrapper.find("li.TreeViewElement > ul > TreeViewElement").exists()).toBe(true);
    expect(wrapper.find("li.TreeViewElement > ul > TreeViewElement").length).toEqual(1);
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
    const wrapper = shallow(<TreeViewElement {...props}/>);
    expect(wrapper.find("ul.Tree__element > TreeViewElement").exists()).toBe(false);
});

it("renders name prop in a span element with class TreeViewElement__name when highlight prop is not provided", () => {
    const props = {
        name: "item1"
    };
    const wrapper = shallow(<TreeViewElement {...props}/>);
    const nameWrapper = wrapper.find("span.TreeViewElement__name");

    expect(nameWrapper.exists()).toBe(true);
    expect(nameWrapper.length).toEqual(1);
    expect(nameWrapper.text()).toEqual(props.name);
});

it("renders name prop in a span element with class TreeViewElement__name and wrap string in name matching highlight prop in a span with class TreeViewElement__name--highlighted", () => {
    const props = {
        name: "item1",
        highlightStr: "em"
    };
    const wrapper = shallow(<TreeViewElement {...props}/>);
    const nameWrapper = wrapper.find("span.TreeViewElement__name");

    expect(nameWrapper.text()).toEqual(props.name);
    expect(nameWrapper.find("span.TreeViewElement__name--highlighted").exists()).toBe(true);
    expect(nameWrapper.find("span.TreeViewElement__name--highlighted").text()).toEqual(props.highlightStr);
});


