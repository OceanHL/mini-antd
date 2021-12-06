/*
 * @Author: jhl
 * @Date: 2021-11-27 14:49:13
 * @LastEditors: jhl
 * @LastEditTime: 2021-12-06 10:27:35
 * @Description:
 */
import React, { useRef, useState } from "react";
import axios from "axios";

import Button from "../Button/button";
import { UploadList } from "./uploadList";
import Dragger from "./dragger";

import type { FC, ChangeEvent } from "react";

export type UploadFileStatus = "ready" | "uploading" | "success" | "error";

export interface UploadFile {
  /**
   * 文件的唯一id
   */
  uid: string;
  /**
   * 文件大小
   */
  size: number;
  /**
   * 文件名字
   */
  name: string;
  /**
   * 上传状态
   */
  status?: UploadFileStatus;
  /**
   * 上传百分比进度
   */
  percent?: number;
  /**
   * 源文件
   */
  raw?: File;
  /**
   * 上传成功后的响应内容
   */
  response?: any;
  /**
   * 上传失败后的错误内容
   */
  error?: any;
}

export interface UploadProps {
  /**
   * 后端地址
   */
  action: string;
  /**
   *  默认的文件列表
   */
  defaultFileList?: UploadFile[];
  /**
   * 上传前的预处理
   */
  beforeUpload?: (file: File) => boolean | Promise<File>;
  /**
   * 进度
   */
  onProgress?: (percentage: number, file: File) => void;
  /**
   * 请求成功
   */
  onSuccess?: (data: any, file: File) => void;
  /**
   * 请求失败
   */
  onError?: (err: any, file: File) => void;
  /**
   * 改变文件，成功失败都会调用
   */
  onChange?: (file: File) => void;
  /**
   * 移除
   */
  onRemove?: (file: UploadFile) => void;
  /**
   * 自定义 header
   */
  headers?: { [key: string]: any };
  /**
   * 自定义请求头的字段名
   */
  name?: string;
  /**
   * 自定义 post formData
   */
  data?: { [key: string]: any };
  /**
   * 发送时是否携带 cookie-withCredentials
   */
  withCredentials?: boolean;
  /**
   * 规定上传文件的类型
   */
  accept?: string;
  /**
   * 是否允许上传多个文件
   */
  multiple?: boolean;
  /**
   * 是否开启拖拽功能
   */
  drag?: boolean;
}

export const Upload: FC<UploadProps> = props => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onChange,
    onProgress,
    onError,
    onSuccess,
    onRemove,
    headers,
    name,
    data,
    withCredentials,
    accept,
    multiple,
    drag,
    children,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList ?? []);
  /**
   * @description 更新文件对象的参数
   * @param {UploadFile} updateFile 更新那个文件对象
   * @param {Partial<UploadFile>} updateObj 更新的参数
   */
  const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
    setFileList(prevList => {
      // 更新某一条数据
      return prevList.map(file => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    uploadFiles(files); // 有files文件，就上传上去
    if (fileInput.current) fileInput.current.value = ""; // 上传之后，清空选中的文件
  };

  const handleRemove = (file: UploadFile) => {
    setFileList(prevList => {
      return prevList.filter(item => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };
  const uploadFiles = (files: FileList) => {
    const postFile = Array.from(files); // 转换为数组
    postFile.forEach(file => {
      if (!beforeUpload) post(file);
      else {
        const result = beforeUpload(file);
        // result 是 Promise 时
        if (result && result instanceof Promise) {
          result.then(processedFile => {
            post(processedFile);
          });
        } else if (result !== false) {
          // result 是 true 时
          post(file);
        }
      }
    });
  };
  const post = (file: File) => {
    const _file: UploadFile = {
      uid: Date.now() + "upload-file",
      status: "ready",
      name: file.name, // 文件名称
      size: file.size, // 文件大小
      percent: 0, // 上传进度
      raw: file, // 源文件内容
    };
    /* setXxxx 多次调用会进行合并，只更新最后的值 */
    setFileList(prevList => {
      return [_file, ...prevList];
    });
    const formData = new FormData();
    formData.append(name ?? "file", file);
    if (data) {
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post(action, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          ...headers,
        },
        withCredentials, // 是否带 cookie
        onUploadProgress: progressEvent => {
          // 上传进度
          console.log("progressEvent", progressEvent);
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total) || 0;
          console.log("percentage", percentage);
          if (percentage < 100) {
            // 因为 onUploadProgress 是异步的， setXxx 也是异步的
            updateFileList(_file, { percent: percentage, status: "uploading" });
            if (onProgress) onProgress(percentage, file);
          }
        },
      })
      .then(res => {
        // 上传成功
        console.log("res", res);
        updateFileList(_file, { percent: 100, status: "success", response: res.data });
        if (onSuccess) onSuccess(res.data, file);
        if (onChange) onChange(file);
      })
      .catch(err => {
        // 上传失败
        console.error(err);
        updateFileList(_file, { percent: 100, status: "error", response: err });
        if (onError) onError(err, file);
        if (onChange) onChange(file);
      });
  };

  return (
    <div className='antd-upload-component'>
      {drag ? (
        <Dragger
          onFile={files => {
            uploadFiles(files);
          }}
        >
          {children}
        </Dragger>
      ) : (
        <Button btnType='primary' onClick={handleClick}>
          Upload File
        </Button>
      )}
      <input
        onChange={handleFileChange}
        ref={fileInput}
        type='file'
        className='antd-file-input'
        style={{ display: "none" }}
        accept={accept}
        multiple={multiple}
      />
      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

export default Upload;
