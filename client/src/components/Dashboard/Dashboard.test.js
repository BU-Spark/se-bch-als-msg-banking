// This will be test for Dashboard.js

// Import the React library
import React from "react";
import Dashboard from "./Dashboard";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import 'regenerator-runtime/runtime'

// Tests:
// 1. Test that the Dashboard component renders

configure({adapter: new Adapter()});
test("Dashboard", () => {
    const wrapper = shallow(<Dashboard />);
    expect(wrapper).toMatchSnapshot();
}
);