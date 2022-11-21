// This will be test for Register.js
// Imports
import React from "react";
import Register from "./Register";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import 'regenerator-runtime/runtime'

// Tests:
// 1. Test that the Register component renders

configure({adapter: new Adapter()});
test("Register", () => {
    const wrapper = shallow(<Register />);
    expect(wrapper).toMatchSnapshot();
}
);