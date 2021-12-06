/*
 * @Author: jhl
 * @Date: 2021-11-29 14:56:00
 * @LastEditors: jhl
 * @LastEditTime: 2021-11-29 15:41:05
 * @Description:
 */
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, waitFor, createEvent } from "@testing-library/react";
import axios from "axios";

import { Upload } from "./upload";

import type { RenderResult } from "@testing-library/react";
import type { UploadProps } from "./upload";

jest.mock("../Icon/icon", () => {
  return ({ icon, onClick }) => {
    return <span onClick={onClick}>{icon}</span>;
  };
});
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const testProps: UploadProps = {
  action: "fakeurl.com",
  onSuccess: jest.fn(),
  onChange: jest.fn(),
  onRemove: jest.fn(),
  drag: true,
};

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement;
const testFile = new File(["xyz"], "test.png", { type: "image/png" });

describe("test upload component", () => {
  beforeEach(() => {
    wrapper = render(<Upload {...testProps}>Click to upload</Upload>);
    fileInput = wrapper.container.querySelector(".antd-file-input")!;
    uploadArea = wrapper.queryByText("Click to upload")!;
  });

  it("upload process should works fine", async () => {
    const { queryByText } = wrapper;
    /* 
      方法1：
    */
    // mockedAxios.post.mockImplementation(() => {
    //   return Promise.resolve({ data: "cool" });
    // });
    /* 
      方法2：直接返回 promise
    */
    mockedAxios.post.mockResolvedValue({
      data: "cool",
    });
    expect(uploadArea).toBeInTheDocument(); // uploadArea 在文档中吗
    expect(fileInput).not.toBeVisible(); // fileInput 不可见
    fireEvent.change(fileInput, { target: { files: [testFile] } });
    expect(queryByText("spinner")).toBeInTheDocument(); // spinner 文字是否出现在文档中
    await waitFor(() => {
      expect(queryByText("test.png")).toBeInTheDocument(); // test.png 文字是否出现在文档中
    });
    expect(queryByText("check-circle")).toBeInTheDocument(); // check-circle 文字是否出现在文档中
    expect(testProps.onSuccess).toHaveBeenCalledWith("cool", testFile);
    expect(testProps.onChange).toHaveBeenCalledWith(testFile);

    // remove the uploaded file
    expect(queryByText("times")).toBeInTheDocument();
    fireEvent.click(queryByText("times")!);
    expect(queryByText("test.png")!).not.toBeInTheDocument();

    /* 
      是否包含某些特定属性
    */
    expect(testProps.onRemove).toHaveBeenCalledWith(
      expect.objectContaining({
        raw: testFile,
        status: "success",
        name: "test.png",
      })
    );
  });

  it("drag and drop files should works fine", async () => {
    fireEvent.dragOver(uploadArea); // 在 uploadArea 元素上触发 dragOver 事件
    expect(uploadArea).toHaveClass("is-dragover");
    fireEvent.dragLeave(uploadArea);
    expect(uploadArea).not.toHaveClass("is-dragover");

    // fireEvent.drop(uploadArea, { dataTransfer: { files: [testFile] } });
    /* 
        jestDom 默认不支持 dataTransfer 属性，需要使用下列方法
    */
    const mockDropEvent = createEvent.drop(uploadArea);
    Object.defineProperty(mockDropEvent, "dataTransfer", {
      value: {
        files: [testFile],
      },
    });
    fireEvent(uploadArea, mockDropEvent);

    await waitFor(() => {
      expect(wrapper.queryByText("test.png")).toBeInTheDocument();
    });
    expect(testProps.onSuccess).toHaveBeenCalledWith("cool", testFile);
  });
});
