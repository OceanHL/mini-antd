/*
 * @Author: jhl
 * @Date: 2021-11-29 16:47:13
 * @LastEditors: jhl
 * @LastEditTime: 2021-12-06 10:26:56
 * @Description:
 */
import React from "react";
import type { FC } from "react";
import Menu from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

import type { MenuProps } from "./menu";
import type { MenuItemProps } from "./menuItem";
import type { SubMenuProps } from "./subMenu";

export type IMenuComponent = FC<MenuProps> & {
  Item: FC<MenuItemProps>;
  SubMenu: FC<SubMenuProps>;
};

const TransMenu = Menu as IMenuComponent;
TransMenu.Item = MenuItem;
TransMenu.SubMenu = SubMenu;

export default TransMenu;
