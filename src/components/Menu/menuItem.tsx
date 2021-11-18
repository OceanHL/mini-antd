/*
 * @Author: jhl
 * @Date: 2021-11-17 11:03:53
 * @LastEditors: jhl
 * @LastEditTime: 2021-11-18 09:02:25
 * @Description:
 */
import React, { useContext } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";

export interface MenuItemProps {
  index?: string;
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const MenuItem: React.FC<MenuItemProps> = props => {
  const { index, disabled, className, style, children } = props;
  const context = useContext(MenuContext);
  const classes = classNames("menu-item", className, {
    "is-disabled": disabled,
    "is-active": context.index === index,
  });
  const handleClick = () => {
    // 通过 React.cloneElement(childElement, {}) 传入属性
    if (context.onSelect && !disabled && typeof index === "string") {
      context.onSelect(index);
    }
  };
  return (
    <li className={classes} style={style} onClick={handleClick}>
      {children}
    </li>
  );
};

// 用于给组件元素打静态类型标识
MenuItem.displayName = "MenuItem";
export default MenuItem;
