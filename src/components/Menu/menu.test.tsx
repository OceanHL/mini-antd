/*
 * @Author: jhl
 * @Date: 2021-11-17 16:29:17
 * @LastEditors: jhl
 * @LastEditTime: 2021-11-18 09:59:22
 * @Description:
 */
import React from "react";
import { fireEvent, render, RenderResult, cleanup, waitFor } from "@testing-library/react";

import Menu, { MenuProps } from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test",
};

const testVerProps: MenuProps = {
  defaultIndex: "0",
  mode: "vertical",
};

const generateMenu = (props: any) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title='dropdown'>
        <MenuItem>drop1</MenuItem>
      </SubMenu>
    </Menu>
  );
};

const createStyleFile = () => {
  const cssFile: string = `
    .antd-submenu {
      display: none:
    }
    .antd-submenu.menu-opened {
      display: block;
    }
  `;
  const style = document.createElement("style");
  style.innerHTML = cssFile;
  return style;
};

let wrapper: RenderResult,
  menuElement: HTMLElement,
  activeElement: HTMLElement,
  disabledElement: HTMLElement;

// 每个 test 结束的时候都会调用 cleanup
describe("test Menu and MenuItem component", () => {
  // beforeEach 钩子，每次执行测试时都会被执行
  beforeEach(() => {
    wrapper = render(generateMenu(testProps));
    wrapper.container.append(createStyleFile());
    // 需要给渲染的元素加 data-testid 属性
    menuElement = wrapper.getByTestId("test-menu");
    activeElement = wrapper.getByText("active");
    disabledElement = wrapper.getByText("disabled");
    // 通过 DOM 操作方法 wrapper.container;
  });

  it("should render correct Menu and MenuItem based on default props", () => {
    expect(menuElement).toBeInTheDocument();
    expect(menuElement).toHaveClass("antd-menu test");
    /* :scope 匹配你调用API的元素。 */
    // expect(menuElement.getElementsByTagName("li").length).toEqual(4); // 下面有4个元素
    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(4);
    expect(activeElement).toHaveClass("menu-item is-active");
    expect(disabledElement).toHaveClass("menu-item is-disabled");
  });
  it("click item should change active and call the right callback", () => {
    const thirdItem = wrapper.getByText("xyz");
    fireEvent.click(thirdItem); // thirdItem 触发 click 事件
    expect(thirdItem).toHaveClass("is-active"); // 当前被点击的元素
    expect(activeElement).not.toHaveClass("is-active"); // 之前被点击的元素，没有 is-active
    expect(testProps.onSelect).toHaveBeenCalledWith("2"); // 是否被调用2次
    // disabledElement DOM 元素触发点击事件
    fireEvent.click(disabledElement);
    expect(disabledElement).not.toHaveClass("is-active");
    expect(testProps.onSelect).not.toHaveBeenCalledWith("1");
  });
  it("should render vertical mode when mode is set to vertical", () => {
    cleanup(); // 清除之前渲染的 DOM
    const wrapper = render(generateMenu(testVerProps));
    const menuElement = wrapper.getByTestId("test-menu");
    expect(menuElement).toHaveClass("menu-vertical");
  });
  it("should show dropdown items when hover on subMenu", async () => {
    expect(wrapper.queryByText("drop1")).toBeVisible();
    const dropdownElement = wrapper.getByText("dropdown");
    fireEvent.mouseEnter(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText("drop1")).toBeVisible();
    });
    fireEvent.click(wrapper.getByText("drop1"));
    expect(testProps.onSelect).toHaveBeenCalledWith("3-0");
    fireEvent.mouseLeave(dropdownElement);
    await waitFor(() => {
      expect(wrapper.queryByText("drop1")).toBeVisible();
    });
  });
});
