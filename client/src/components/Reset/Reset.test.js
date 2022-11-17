// This will be test for Reset.js
// Imports
import React from "react";
import Reset from "./Reset";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import 'regenerator-runtime/runtime'

// Tests:
// 1. Test that the Reset component renders

configure({adapter: new Adapter()});
test("Reset", () => {
    const wrapper = shallow(<Reset />);
    expect(wrapper).toMatchSnapshot();
}
);