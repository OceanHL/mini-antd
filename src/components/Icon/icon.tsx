/*
 * @Author: jhl
 * @Date: 2021-11-18 10:12:29
 * @LastEditors: jhl
 * @LastEditTime: 2021-11-18 10:39:41
 * @Description:
 */
import React from "react";
import classNames from "classnames";
import { FontAwesomeIcon, FontAwesomeIconProps } from "@fortawesome/react-fontawesome";

export type ThemeProps =
  | "primary"
  | "secondary"
  | "success"
  | "info"
  | "warning"
  | "danger"
  | "light"
  | "dark";

// 继承组件的属性
export interface IconProps extends FontAwesomeIconProps {
  theme?: ThemeProps;
}

const Icon: React.FC<IconProps> = props => {
  // icon-primary
  const { className, theme, ...restProps } = props;

  const classes = classNames("antd-icon", className, {
    [`icon-${theme}`]: theme,
  });

  return <FontAwesomeIcon className={classes} {...restProps} />;
};

export default Icon;
