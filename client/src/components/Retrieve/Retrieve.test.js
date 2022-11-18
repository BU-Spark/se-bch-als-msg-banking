//THis will be test for Retrieve.js
// Imports
import React from "react";
import Retrieve from "./Retrieve";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import 'regenerator-runtime/runtime'

// Tests:
// 1. Test that the Retrieve component renders

configure({adapter: new Adapter()});
test("Retrieve", () => {
    const wrapper = shallow(<Retrieve />);
    expect(wrapper).toMatchSnapshot();
}
);
