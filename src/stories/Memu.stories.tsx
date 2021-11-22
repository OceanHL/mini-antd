import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Menu } from "../components/Menu/menu";
import { MenuItem } from "../components/Menu/menuItem";
import SubMenu from "../components/Menu/subMenu";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: "Example/Menu",
  component: Menu,
  subcomponents: { MenuItem, SubMenu },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    // backgroundColor: { control: "color" },
    defaultIndex: {
      type: {
        name: "number",
        require: false, // 是否必须
      },
      table: {
        category: "Sizes",
        summary: "摘要",
        detail: "细节",
        defaultVlue: {
          summary: "默认值摘要",
          detail: "默认值细节",
        },
      },
      control: {
        type: "number", // 控制器的类型 radio | color | text
      },
    },
  },
  parameters: {
    docs: {
      inlineStories: false,
      // page: () => (
      //   <>
      //     <div>测试</div>
      //   </>
      // ),
      source: {
        code: "Some custom string here",
      },
    },
  },
} as ComponentMeta<typeof Menu>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Menu> = args => (
  <Menu {...args}>
    <MenuItem>MenuItem1</MenuItem>
    <MenuItem>MenuItem2</MenuItem>
    <SubMenu title='submenu1'>
      <MenuItem>Submenu1 - MenuItem1</MenuItem>
      <MenuItem>Submenu1 - MenuItem2</MenuItem>
      <MenuItem>Submenu1 - MenuItem3</MenuItem>
    </SubMenu>
    <MenuItem>MenuItem4</MenuItem>
  </Menu>
);

export const Horizontal = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Horizontal.args = {};

export const Vertical = Template.bind({});
Vertical.args = {
  mode: "vertical", // 垂直
  onSelect(e) {
    console.log("xxx", e);
  },
};
// 自定义文档内容
export const CustomDocumentationComponent: React.VFC<{}> = () => {
  return (
    <div>
      <h1>Replacing DocsPage with a custom component</h1>
      <p>
        The Docs page can be customized with your own custom content written as a React Component.
      </p>
      <p>Write your own code here👇</p>
    </div>
  );
};
