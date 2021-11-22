/*
 * @Author: jhl
 * @Date: 2021-11-16 11:28:42
 * @LastEditors: jhl
 * @LastEditTime: 2021-11-22 15:39:18
 * @Description: Button 组件
 */
import React, { ButtonHTMLAttributes, AnchorHTMLAttributes, FC } from "react";
import classNames from "classnames";

// 不同大小
export type ButtonSize = "lg" | "sm";

// 不同类型
export type ButtonType = "primary" | "default" | "danger" | "link";

// 定义按钮组件 props 接口
interface BaseButtonProps {
  className?: string;
  /**
   * 设置 Button 的禁用
   */
  disabled?: boolean;
  /**
   * 设置 Button 的尺寸
   */
  size?: ButtonSize;
  /**
   * 设置 Button 的类型
   */
  btnType?: ButtonType;
  /**
   * 设置内容
   */
  children: React.ReactNode;
  /* 
    link 类型的目标地址
  */
  href?: string;
}

// 交叉类型：将多个类型合并为一个类型
type NativeButtonProps = BaseButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorButtonProps = BaseButtonProps & AnchorHTMLAttributes<HTMLAnchorElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

/**
 * 这是我们第一个 Button 组件
 * ## Button header
 * ~~~js
 * import { Button } from 'mini-antd';
 * ~~~
 */
export const Button: FC<ButtonProps> = ({
  className,
  disabled,
  size,
  btnType,
  children,
  href,
  ...restProps // 剩余参数
}) => {
  // 拼接类名 btn btn-lg btn-primary
  const classes = classNames("btn", className, {
    [`btn-${btnType}`]: btnType, // 按钮类型
    [`btn-${size}`]: size, // 按钮大小
    disabled: btnType === "link" && disabled, // 如果是 link 类型则 添加 disabled
  });

  // link 类型必须有 href 属性才有效
  if (btnType === "link" && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled} {...restProps}>
      {children}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
  btnType: "default",
};

export default Button;
