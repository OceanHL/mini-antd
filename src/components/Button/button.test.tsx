/*
 * @Author: jhl
 * @Date: 2021-11-16 16:03:54
 * @LastEditors: jhl
 * @LastEditTime: 2021-11-18 14:58:39
 * @Description:
 */
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Button, { ButtonProps } from "./button";

const defaultProps = {
  onClick: jest.fn(),
};

const testProps: ButtonProps = {
  btnType: "primary",
  size: "lg",
  className: "klass",
};

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
};

// it 和 test 都可以
/* it("our first react test case", () => {
  const wrapper = render(<Button>Nice</Button>);
  const element = wrapper.queryByText("Nice"); // 找 Nice 文本
  expect(element).toBeTruthy(); // 是否找为真值
  expect(element).toBeInTheDocument(); // 是否在文档中
}); */

// 使用 describe 将测试进行分类
describe("test Button component", () => {
  it("should render the correct default button", () => {
    const wrapper = render(<Button {...defaultProps}>Nice</Button>);
    // const element = wrapper.queryByText("Nice"); // 找 Nice 文本， 返回 HTMLElement | null
    const element = wrapper.getByText("Nice") as HTMLButtonElement; // 找 Nice 文本, 返回 HTMLElement

    // expect(element).toBeTruthy(); // 是否找为真值
    expect(element).toBeInTheDocument(); // 是否在文档中
    expect(element.tagName).toEqual("BUTTON"); // 标签名是否为 BUTTON
    expect(element).toHaveClass("btn btn-default"); // 是否拥有 btn btn-default 类名
    expect(element.disabled).toBeFalsy();
    fireEvent.click(element); // 在 element 上调用 click 方法
    expect(defaultProps.onClick).toHaveBeenCalled(); // 这个方法是否被调用
  });
  it("should render the correct component based on different props", () => {
    const wrapper = render(<Button {...testProps}>Nice</Button>);
    const element = wrapper.getByText("Nice"); // 找 Nice 文本, 返回 HTMLElement
    expect(element).toBeInTheDocument(); // 是否在文档中
    expect(element).toHaveClass("btn-primary btn-lg klass");
  });
  it("should render a link when btnType equals link and href is provided", () => {
    const wrapper = render(
      <Button btnType='link' href='http://www.baidu.com'>
        Link
      </Button>
    );
    const element = wrapper.getByText("Link"); // 找 Nice 文本, 返回 HTMLElement
    expect(element).toBeInTheDocument(); // 是否在文档中
    expect(element.tagName).toEqual("A"); // 是否是 A 标签
    expect(element).toHaveClass("btn btn-link");
  });
  it("should render disabled button when disabled set to true", () => {
    const wrapper = render(<Button {...disabledProps}>Nice</Button>);
    const element = wrapper.getByText("Nice") as HTMLButtonElement;
    expect(element).toBeInTheDocument();
    expect(element.disabled).toBeTruthy();
    // 触发点击事件
    fireEvent.click(element);
    expect(disabledProps.onClick).not.toHaveBeenCalled();
  });
});
