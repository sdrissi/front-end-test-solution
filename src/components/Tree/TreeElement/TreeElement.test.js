import React from "react";
import { shallow } from "enzyme";
import TreeElement from "./TreeElement";

it("should render without crashing", () => {
    shallow(<TreeElement/>);
});