/*
 * @Author: jhl
 * @Date: 2021-11-26 11:19:33
 * @LastEditors: jhl
 * @LastEditTime: 2021-11-26 11:32:13
 * @Description:
 */
import { FC } from "react";
const a = ["1", "abc", ""];

interface AutoCompleteProps {
  data: string[];
  /**
   * 根据关键词进行筛选
   */
  fetchSuggestions: (keyword: string, data: string[]) => string[] | Promise<string[]>;
  onSelect: (item: string) => void;
}

const handleChange = (keyword: string) => {
  return a.filter(item => item.includes(keyword));
  // return fetch(`url?keyword=${keyword}`).then(response => response.json());
};

const handleSelect = (item: string) => {
  console.log(item);
};

<AutoComplete fetchSuggestions={handleChange} onSelect={handleSelect} />;

// 自定义 option
// 键盘上下移动
// 防抖 debource
// click outside

export default AutoComplete;
