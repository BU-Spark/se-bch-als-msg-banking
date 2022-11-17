// This will be test for Upload.js
// Imports
import React from "react";
import Upload from "./Upload";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import 'regenerator-runtime/runtime'

// Tests:
// 1. Test that the Upload component renders

configure({adapter: new Adapter()});
test("Upload", () => {
    const wrapper = shallow(<Upload />);
    expect(wrapper).toMatchSnapshot();
}
);