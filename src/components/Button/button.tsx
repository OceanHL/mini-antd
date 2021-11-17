/*
 * @Author: jhl
 * @Date: 2021-11-16 11:28:42
 * @LastEditors: jhl
 * @LastEditTime: 2021-11-16 15:23:43
 * @Description: Button 组件
 */
import React from "react";
import classNames from "classnames";

// 不同大小
export enum ButtonSize {
  Large = "lg",
  Small = "sm",
}

// 不同类型
export enum ButtonType {
  Primary = "primary",
  Default = "default",
  Danger = "danger",
  Link = "link",
}

// 定义按钮组件 props 接口
interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  children: React.ReactNode;
  href?: string;
}

// 交叉类型：将多个类型合并为一个类型
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>;
type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLAnchorElement>;
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = ({
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
    disabled: btnType === ButtonType.Link && disabled, // 如果是 link 类型则 添加 disabled
  });

  // link 类型必须有 href 属性才有效
  if (btnType === ButtonType.Link && href) {
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
  btnType: ButtonType.Default,
};

export default Button;
