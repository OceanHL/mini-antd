/*
 * @Author: jhl
 * @Date: 2021-11-27 17:53:16
 * @LastEditors: jhl
 * @LastEditTime: 2021-11-27 18:04:07
 * @Description:
 */
import Icon from "../Icon/icon";
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
          </li>
        );
      })}
    </ul>
  );
};

export default UploadList;
