//This will be test for Login.js
// Imports
import React from "react";
import Login from "./Login";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import 'regenerator-runtime/runtime'

// Tests:
// 1. Test that the Login component renders

configure({adapter: new Adapter()});
test("Login", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper).toMatchSnapshot();
}
);