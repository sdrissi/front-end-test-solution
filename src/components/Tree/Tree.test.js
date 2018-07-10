import React from "react";
import { shallow } from "enzyme";
import Tree from "./Tree";
import TreeElement from "./TreeElement";

it("renders without crashing", () => {
    shallow(<Tree/>);
});

it("renders a div with class Tree", () => {
    const wrapper = shallow(<Tree/>);
    expect(wrapper.find("div.Tree").exists()).toBe(true);
})

it("renders items as TreeElement", () => {
    const props = {
        items: [
            {
                id: 1,
                name: "item1",
                items: null
            }
        ]
    };

    const wrapper = shallow(<Tree {...props}/>);
    expect(wrapper.find(TreeElement).exists()).toBe(true);
});

it("doesn't render TreeElement when no items provided", () => {
    const wrapper = shallow(<Tree/>);

    expect(wrapper.find(TreeElement).exists()).toBe(false);
});


it("renders one TreeElement when there is one item", () => {
    const props = {
        items: [
            {
                id: 1,
                name: "item1",
                items: null
            }
        ]
    };

    const wrapper = shallow(<Tree {...props}/>);
    expect(wrapper.find(TreeElement).length).toEqual(1);
});

it("renders children correctly", () => {
    const wrapper = shallow(<Tree>
        <div className="child1"/>
    </Tree>);
    expect(wrapper.find(".Tree .child1").exists()).toBe(true);
});

it("renders the correct number of children", () => {
    const wrapper = shallow(<Tree>
        <div className="child1"/>
        <div className="child1"/>
    </Tree>);
    expect(wrapper.find(".Tree .child1").length).toEqual(2);
});

it("renders children after items", () => {
    const props = {
        items: [
            {
                id: 1,
                name: "item1",
                items: null
            }
        ]
    };
    const wrapper = shallow(<Tree {...props}>
        <div className="child2"/>
    </Tree>);
    expect(wrapper.find("TreeElement + div").exists()).toBe(true);
    expect(wrapper.find("TreeElement + div").length).toEqual(1);
});





