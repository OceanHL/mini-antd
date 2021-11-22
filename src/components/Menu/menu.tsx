/*
 * @Author: jhl
 * @Date: 2021-11-17 10:45:49
 * @LastEditors: jhl
 * @LastEditTime: 2021-11-22 15:46:51
 * @Description:
 */
import React, { useState, createContext } from "react";
import classNames from "classnames";
import { MenuItemProps } from "./menuItem";

// 字符串字面量类型
type MenuMode = "horizontal" | "vertical";
type SelectCallback = (selectedIndex: string) => void;

export interface MenuProps {
  /**
   * Is this the principal call to action on the page?
   */
  defaultIndex?: string; // 那个 item 高亮
  /**
   * What background color to use
   */
  className?: string;
  /**
   * What background color to use
   */
  mode?: MenuMode;
  /**
   * What background color to use
   */
  style?: React.CSSProperties;
  /**
   * What background color to use
   */
  onSelect?: SelectCallback;
  /**
   * What background color to use
   */
  defaultOpenSubMenus?: string[];
}

// 定义 Context 长什么样子
interface IMenuContext {
  index: string;
  onSelect?: SelectCallback;
  mode?: MenuMode;
  defaultOpenSubMenus?: string[];
}

// 传入泛型参数 + 初始值
export const MenuContext = createContext<IMenuContext>({
  index: "0",
});

/**
 * 这是一个 menu 组件
 */
export const Menu: React.FC<MenuProps> = props => {
  const { defaultIndex, className, mode, style, onSelect, defaultOpenSubMenus, children } = props;
  const [currentArtive, setActive] = useState(defaultIndex);

  const classes = classNames("antd-menu", className, {
    "menu-vertical": mode === "vertical",
    "menu-horizontal": mode !== "vertical",
  });

  const handleClick = (index: string) => {
    setActive(index); // 更新 currentArtive
    if (onSelect) onSelect(index);
  };

  const passedContext: IMenuContext = {
    index: currentArtive ?? "0",
    onSelect: handleClick,
    mode,
    defaultOpenSubMenus,
  };

  const renderClidren = () => {
    return React.Children.map(children, (child, index) => {
      const childElement = child as React.FunctionComponentElement<MenuItemProps>;

      const { displayName } = childElement.type;
      if (displayName === "MenuItem" || displayName === "SubMenu") {
        return React.cloneElement(childElement, {
          index: index.toString(), // 自动给子元素传入 index 属性
        }); //
      } else {
        // 不是 MenuItem 类型自动跳过
        console.error("Warning: Menu has a child which is not a MenuItem component");
      }
    });
  };

  return (
    <ul className={classes} style={style} data-testid='test-menu'>
      <MenuContext.Provider value={passedContext}>{renderClidren()}</MenuContext.Provider>
    </ul>
  );
};

Menu.defaultProps = {
  defaultIndex: "0",
  mode: "horizontal",
  defaultOpenSubMenus: [],
};

export default Menu;
