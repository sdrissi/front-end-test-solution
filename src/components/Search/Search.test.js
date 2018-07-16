import React from "react";
import { shallow } from "enzyme";
import Search from "./Search";

it("renders without crashing", () => {
    shallow(<Search onChange={jest.fn()}/>);
});

it("renders one div with class Search", () => {
    const wrapper = shallow(<Search onChange={jest.fn()}/>);

    expect(wrapper.find("div").hasClass("Search")).toBe(true);
    expect(wrapper.find("div").length).toEqual(1);
});

it("renders an input of type text", () => {
    const wrapper = shallow(<Search onChange={jest.fn()}/>);
    expect(wrapper.find("input").prop("type")).toEqual("text");
});

it("renders placeholder according to placeholder prop", () => {
    const props = {
        onChange: jest.fn(),
        placeholder: "Search"
    };
    const wrapper = shallow(<Search {...props}/>);
    expect(wrapper.find("input").prop("placeholder")).toEqual("Search");
});

it("should have highlight state equals false when initialized", () => {
    const wrapper = shallow(<Search onChange={jest.fn()}/>);
    expect(wrapper.state().highlight).toBe(false);
})

it("should respond to change event by calling onChange with input value", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Search onChange={onChange}/>);

    wrapper.find("input").simulate("change", { target: { value: "a" } });

    expect(onChange.mock.calls.length).toEqual(1);
    expect(onChange).toHaveBeenCalledWith("a", false);
});

it("should respond to change event by calling onChange prop with input value after the specified timeout", () => {
    jest.useFakeTimers();
    const onChange = jest.fn();
    const props = {
        onChange: onChange,
        timeout: 500
    }
    const wrapper = shallow(<Search {...props}/>);

    wrapper.find("input").simulate("change", { target: { value: "a" } });

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(onChange, 500, "a", false);
});
