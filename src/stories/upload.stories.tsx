import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { Upload } from "../components/Upload/upload";
import type { UploadFile } from "../components/Upload/upload";

export default {
  title: "Example/Upload",
  component: Upload,
  argTypes: {
    backgroundColor: { control: "color" },
  },
} as ComponentMeta<typeof Upload>;

const Template: ComponentStory<typeof Upload> = args => <Upload {...args} />;

const defaultFileList: UploadFile[] = [
  { uid: "123", size: 1234, name: "hello.md", status: "uploading", percent: 30 },
  { uid: "122", size: 1234, name: "xyz.md", status: "success", percent: 30 },
  { uid: "121", size: 1234, name: "eyiha.md", status: "error", percent: 30 },
];

// 检查文件大小
const checkFileSize = (file: File) => {
  if (Math.round(file.size / 1024) > 50) {
    // 大于 50kb 时
    alert("文件太大了");
    return false;
  }
  return true;
};

// 文件重命名
const filePromise = (file: File) => {
  const newFile = new File([file], "new_name.docx", { type: file.type });
  console.log("newFile", newFile);
  return Promise.resolve(newFile);
};

export const SimpleUpload = Template.bind({});
SimpleUpload.args = {
  action: "https://jsonplaceholder.typicode.com/posts",
  onProgress: action("progress"),
  onSuccess: action("success"),
  onError: action("error"),
  defaultFileList,
  // beforeUpload: checkFileSize,
  // beforeUpload: filePromise,
};
SimpleUpload.storyName = "Upload";
