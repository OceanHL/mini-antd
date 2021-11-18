/*
 * @Author: jhl
 * @Date: 2021-11-17 18:07:49
 * @LastEditors: jhl
 * @LastEditTime: 2021-11-18 14:51:08
 * @Description:
 */
import React, { useState, useContext, FunctionComponentElement } from "react";
import classNames from "classnames";
import { MenuContext } from "./menu";
import { MenuItemProps } from "./menuItem";
import Icon from "../Icon/icon";
import Transition from "../Transition/transition";

// 定义 props 类型
export interface SubMenuProps {
  index?: string;
  title: string;
  className?: string;
}

const SubMenu: React.FC<SubMenuProps> = ({ index, title, className, children }) => {
  const context = useContext(MenuContext);
  const openedSubMenus = context.defaultOpenSubMenus as Array<string>;
  const isOpen = index && context.mode === "vertical" ? openedSubMenus.includes(index) : false;
  const [menuOpen, setMenuOpen] = useState(isOpen);
  const classes = classNames("menu-item submenu-item", className, {
    "is-active": context.index === index,
    "is-opened": menuOpen,
    "is-vertical": context.mode === "vertical",
  });
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(!menuOpen);
  };

  let timer: NodeJS.Timeout;

  const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
    if (timer) clearTimeout(timer);
    e.preventDefault();
    timer = setTimeout(() => {
      setMenuOpen(toggle);
    }, 300);
  };

  const clickEvents =
    context.mode === "vertical"
      ? {
          onClick: handleClick,
        }
      : {};
  const hoverEvents =
    context.mode !== "vertical"
      ? {
          onMouseEnter: (e: React.MouseEvent) => {
            handleMouse(e, true);
          },
          onMouseLeave: (e: React.MouseEvent) => {
            handleMouse(e, false);
          },
        }
      : [];

  const renderChilren = () => {
    const subMenuClasses = classNames("antd-submenu", {
      "menu-opened": menuOpen,
    });
    const childrenComponent = React.Children.map(children, (child, idx) => {
      const childElement = child as FunctionComponentElement<MenuItemProps>;
      if (childElement.type.displayName === "MenuItem") {
        return React.cloneElement(childElement, {
          index: `${index}-${idx}`,
        });
      } else {
        // 不是 MenuItem 类型自动跳过
        console.error("Warning: SubMenu has a child which is not a MenuItem component");
      }
    });
    return (
      <Transition in={menuOpen} timeout={1000} animation='zoom-in-top'>
        <ul className={subMenuClasses}>{childrenComponent}</ul>
      </Transition>
    );
  };

  return (
    <li key={index} className={classes} {...hoverEvents}>
      <div className='submenu-title' {...clickEvents}>
        {title}
        <Icon icon='angle-down' className='arrow-icon' />
      </div>
      {renderChilren()}
    </li>
  );
};

SubMenu.displayName = "SubMenu";
export default SubMenu;
