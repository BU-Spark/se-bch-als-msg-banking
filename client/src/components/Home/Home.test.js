// This will be test for Home.js
// Imports
import React from "react";
import Home from "./Home";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import 'regenerator-runtime/runtime'

// Tests:
// 1. Test that the Home component renders


configure({adapter: new Adapter()});
test("Home", () => {
    const wrapper = shallow(<Home />);
    expect(wrapper).toMatchSnapshot();
}
);