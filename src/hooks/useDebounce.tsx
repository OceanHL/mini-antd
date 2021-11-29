/*
 * @Author: jhl
 * @Date: 2021-11-26 15:11:04
 * @LastEditors: jhl
 * @LastEditTime: 2021-11-26 15:21:48
 * @Description:
 *
 */
import { useState, useEffect } from "react";
/**
 * @description 防抖函数
 * @param {*} value 是一个响应式数据【会变化的数据】
 * @param {number} delay 延迟时间
 * @return {number} debouncedValue
 */
function useDebounce(value: any, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = window.setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
export default useDebounce;
