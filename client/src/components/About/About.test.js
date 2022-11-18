// This will be the test for About.js

// Imports
import React from "react";
import About from "./About";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";


// Tests:
// 1. Test that the About component renders
configure({adapter: new Adapter()});
test("About", () => {
    const wrapper = shallow(<About />);
    expect(wrapper).toMatchSnapshot();
}
);
