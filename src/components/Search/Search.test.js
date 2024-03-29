import React from "react";
import { mount, shallow } from "enzyme";
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

it("renders one span element with class Search__button", () => {
    const wrapper = shallow(<Search onChange={jest.fn()}/>);

    expect(wrapper.find("span.Search__button").length).toEqual(1);
    expect(wrapper.find("span").hasClass("Search__button")).toBe(true);
});

it("should have highlight state equals true when initialized", () => {
    const wrapper = shallow(<Search onChange={jest.fn()}/>);
    expect(wrapper.state().highlight).toBe(true);
});

it("should respond to click event on Search__button by setting highlight state to false and calling onChange", () => {
    const onChange = jest.fn();
    const wrapper = mount(<Search onChange={onChange}/>);

    wrapper.find(".Search__button").simulate("click");

    expect(onChange.mock.calls.length).toEqual(1);
    expect(wrapper.state().highlight).toBe(false);
});

it("should respond to change event by calling onChange prop with input value and highlight true", () => {
    const onChange = jest.fn();
    const wrapper = shallow(<Search onChange={onChange}/>);

    wrapper.find("input").simulate("change", { target: { value: "a" } });

    expect(onChange.mock.calls.length).toEqual(1);
    expect(onChange).toHaveBeenCalledWith("a", true);
});

it("should respond to change event by calling onChange prop with input value and highlight true after the specified timeout", () => {
    jest.useFakeTimers();
    const onChange = jest.fn();
    const props = {
        onChange: onChange,
        timeout: 500
    }
    const wrapper = shallow(<Search {...props}/>);

    wrapper.find("input").simulate("change", { target: { value: "a" } });

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(onChange, 500, "a", true);
});
