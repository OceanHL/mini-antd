/*
 * @Author: jhl
 * @Date: 2021-11-27 17:53:16
 * @LastEditors: jhl
 * @LastEditTime: 2021-12-06 10:27:45
 * @Description:
 */
import React from "react";
import Icon from "../Icon/icon";
import Progress from "../Progress/progress";

import type { FC } from "react";
import type { UploadFile } from "./upload";

interface UploadListProps {
  fileList: UploadFile[];
  onRemove: (_file: UploadFile) => void;
}

export const UploadList: FC<UploadListProps> = props => {
  const { fileList, onRemove } = props;
  return (
    <ul className='antd-upload-list'>
      {fileList.map(item => {
        return (
          <li className='antd-upload-list-item' key={item.uid}>
            <span className={`file-name file-name-${item.status}`}>
              <Icon theme='secondary' icon='file-alt' />
              {item.name}
            </span>
            <span className='file-status'>
              {item.status === "uploading" && <Icon icon='spinner' spin theme='primary' />}
              {item.status === "success" && <Icon icon='check-circle' theme='success' />}
              {item.status === "error" && <Icon icon='times-circle' theme='danger' />}
            </span>
            <span className='file-actions'>
              <Icon
                icon='times'
                onClick={() => {
                  onRemove(item);
                }}
              />
            </span>
            {item.status === "uploading" && <Progress percent={item.percent ?? 0} />}
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
