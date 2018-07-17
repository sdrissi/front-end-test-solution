import React from "react";
import { shallow } from "enzyme";
import TreeView from "./TreeView";
import TreeViewElement from "./TreeViewElement";

const testProps = {
    items: [
        {
            id: "1",
            name: "item1",
            items: null
        }
    ]
};

it("renders without crashing", () => {
    shallow(<TreeView/>);
});

it("renders an ul with class TreeView", () => {
    const wrapper = shallow(<TreeView/>);

    expect(wrapper.find("ul.TreeView").exists()).toBe(true);
    expect(wrapper.find("ul.TreeView").length).toEqual(1);
})

it("renders items as TreeViewElement", () => {
    const wrapper = shallow(<TreeView {...testProps}/>);

    expect(wrapper.find(TreeViewElement).exists()).toBe(true);
});

it("doesn't render TreeViewElement when no items provided", () => {
    const wrapper = shallow(<TreeView/>);

    expect(wrapper.find(TreeViewElement).exists()).toBe(false);
});


it("renders one TreeViewElement when there is one item", () => {
    const wrapper = shallow(<TreeView {...testProps}/>);

    expect(wrapper.find(TreeViewElement).length).toEqual(1);
});

it("renders children correctly", () => {
    const wrapper = shallow(<TreeView>
        <div className="child1"/>
    </TreeView>);

    expect(wrapper.find(".TreeView .child1").exists()).toBe(true);
});

it("renders the correct number of children", () => {
    const wrapper = shallow(<TreeView>
        <div className="child1"/>
        <div className="child1"/>
    </TreeView>);

    expect(wrapper.find(".TreeView .child1").length).toEqual(2);
});

it("renders children after items", () => {
    const wrapper = shallow(<TreeView {...testProps}>
        <div className="child2"/>
    </TreeView>);

    expect(wrapper.find("TreeViewElement + div").exists()).toBe(true);
    expect(wrapper.find("TreeViewElement + div").length).toEqual(1);
});





