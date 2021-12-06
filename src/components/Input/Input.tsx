/*
 * @Author: jhl
 * @Date: 2021-11-22 16:37:22
 * @LastEditors: jhl
 * @LastEditTime: 2021-12-06 10:26:45
 * @Description:
 */
import React, { ReactElement, InputHTMLAttributes, FC } from "react";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import classNames from "classnames";
import Icon from "../Icon/icon";
import { ChangeEvent } from "react";

type InputSize = "lg" | "sm";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLElement>, "size"> {
  /**
   * 是否禁用 Input
   */
  disabled?: boolean;

  /**
   * 设置 input 大小，支持 lg 或者是 sm
   */
  size?: InputSize; // size 属性与 InputHTMLAttributes 的 size 属性重名，并类型不同

  /**
   * 添加图表，在右侧悬浮添加一个图标，用于提示
   */
  icon?: IconProp;

  /**
   * 添加前缀，用于配置一些固定组合
   */
  prepend?: string | ReactElement;

  /**
   * 添加后缀，用于配置一些固定组合
   */
  append?: string | ReactElement;

  /**
   * 修改事件
   */
  onChange?(e: ChangeEvent<HTMLInputElement>): void;
}

// 这个 export 是为 storybook 服务的
/**
 * Input 输入框通过鼠标或键盘输入内容，是最基础的表单域的包装。
 *
 * ~~~js
 * // 这样引用
 * import { Input } from 'mini-antd';
 * ~~~
 * 支持 HTMLInput 的所有基本属性
 */
export const Input: FC<InputProps> = props => {
  // 1、取出各种属性
  const { disabled, size, icon, prepend, append, style, ...restProps } = props;

  // 2、根据属性计算不同的 className
  const cnames = classNames("mini-antd-input-wrapper", {
    [`input-size-${size}`]: size,
    "is-disabled": disabled,
    "input-group": prepend || append,
    "input-group-append": !!append,
    "input-group-prepend": !!prepend,
  });

  const fixControlledValue = (value: any) => {
    if (typeof value === "undefined" || value == null) {
      return "";
    }
    return value;
  };

  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = fixControlledValue(props.value);
  }

  return (
    // 3、根据属性判断是否添加特定的节点
    <div className={cnames} style={style}>
      {prepend && <div className='mini-antd-input-group-prepend'>{prepend}</div>}
      {icon && (
        <div className='icon-wrapper'>
          <Icon icon={icon} title={`title-${icon}`} />
        </div>
      )}
      <input className='mini-antd-input-inner' disabled={disabled} {...restProps} />
      {append && <div className='mini-antd-input-group-append'>{append}</div>}
    </div>
  );
};

export default Input;
