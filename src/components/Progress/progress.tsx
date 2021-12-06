/*
 * @Author: jhl
 * @Date: 2021-11-29 10:56:27
 * @LastEditors: jhl
 * @LastEditTime: 2021-12-06 10:27:14
 * @Description:
 */
import React from "react";
import type { FC } from "react";
import type { ThemeProps } from "../Icon/icon";

interface ProgressProps {
  /**
   * 百分比
   */
  percent: number;
  /* 
    高度
  */
  strokeHeight?: number;
  /**
   * 显示文字
   */
  showText?: boolean;
  /**
   * 样式
   */
  styles?: React.CSSProperties;
  /**
   * 主题
   */
  theme?: ThemeProps;
}

const Progress: FC<ProgressProps> = props => {
  const { percent, showText, strokeHeight, styles, theme } = props;
  return (
    <div className='antd-progress-bar' style={styles}>
      <div className='antd-progress-bar-outer' style={{ height: `${strokeHeight}px` }}>
        <div className={`antd-progress-bar-inner color-${theme}`} style={{ width: `${percent}%` }}>
          {showText && <span className='inner-text'>{`${percent}%`}</span>}
        </div>
      </div>
    </div>
  );
};

Progress.defaultProps = {
  strokeHeight: 15,
  showText: true,
  theme: "primary",
};

export default Progress;
