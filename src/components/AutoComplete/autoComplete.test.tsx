/*
 * @Author: jhl
 * @Date: 2021-11-26 16:34:41
 * @LastEditors: jhl
 * @LastEditTime: 2021-12-06 10:26:08
 * @Description:
 */
import React from "react";
import { config } from "react-transition-group";
import { AutoComplete } from "./AutoComplete";
import type { AutoCompleteProps } from "./AutoComplete";
import { render, RenderResult, fireEvent, waitFor } from "@testing-library/react";

config.disabled = true;
const testArray = [
  { value: "ab", number: 11 },
  { value: "abc", number: 1 },
  { value: "b", number: 4 },
  { value: "c", number: 15 },
];

const testProps: AutoCompleteProps = {
  fetchSuggestions: query => {
    return testArray.filter(item => item.value.includes(query));
  },
  onSelect: jest.fn(), // jest.fn() 是一个函数
  placeholder: "auto-complete",
};

let wrapper: RenderResult, inputNode: HTMLInputElement;
describe("test AutoComplete component", () => {
  beforeEach(() => {
    wrapper = render(<AutoComplete {...testProps} />);
    inputNode = wrapper.getByPlaceholderText("auto-complete") as HTMLInputElement;
  });

  it("AutoComplete behavior", async () => {
    fireEvent.change(inputNode, { target: { value: "a" } });
    await waitFor(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    expect(wrapper.container.querySelectorAll("suggestion-item").length).toEqual(2);
    fireEvent.click(wrapper.getByText("ab"));
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: "ab", number: 11 });
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
    expect(inputNode.value).toBe("ab");
  });

  it("测试键盘功能", async () => {
    fireEvent.change(inputNode, { target: { value: "a" } });
    await waitFor(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    const firstResult = wrapper.queryByText("ab");
    const secondResult = wrapper.queryByText("abc");

    // arrow down
    fireEvent.keyDown(inputNode, { key: "ArrowDown" });
    expect(firstResult).toHaveClass("is-active");
    // arrow down
    fireEvent.keyDown(inputNode, { key: "ArrowDown" });
    expect(secondResult).toHaveClass("is-active");
    // arrow up
    fireEvent.keyDown(inputNode, { key: "ArrowUp" });
    expect(firstResult).toHaveClass("is-active");
    // enter
    fireEvent.keyDown(inputNode, { key: "Enter" });
    expect(firstResult).toHaveClass("is-active");
    expect(testProps.onSelect).toHaveBeenCalledWith({ value: "ab", number: 11 });
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
  });

  it("模拟点击组件外部", async () => {
    fireEvent.change(inputNode, { target: { value: "a" } });
    await waitFor(() => {
      expect(wrapper.queryByText("ab")).toBeInTheDocument();
    });
    fireEvent.click(document);
    expect(wrapper.queryByText("ab")).not.toBeInTheDocument();
  });

  it("显示自定义的 renderOption", () => {});

  it("异步功能", () => {});
});
