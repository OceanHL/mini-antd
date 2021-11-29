import { FC, useState, useEffect, useRef } from "react";
import classNames from "classnames";

import Input from "../Input/Input";
import Icon from "../Icon";
import useDebounce from "../../hooks/useDebounce";
import Transition from "../Transition/transition";

import type { InputProps } from "../Input/Input";
import type { ReactElement, ChangeEvent, KeyboardEvent } from "react";
import useClickOutside from "../../hooks/useClickOutside";

export interface AutoCompleteProps extends Omit<InputProps, "onSelect"> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;

export const AutoComplete: FC<AutoCompleteProps> = props => {
  const { fetchSuggestions, onSelect, renderOption, value, ...restProps } = props;
  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null);
  const debouncedValue = useDebounce(inputValue, 500);
  useClickOutside(componentRef, () => {
    setSuggestions([]);
  });
  console.log("suggestions", suggestions);

  useEffect(() => {
    // 判断是否重新发送请求，triggerSearch.current 为 true 时重新发送请求
    if (debouncedValue && triggerSearch.current) {
      console.log("triggered");
      setLoading(true);
      const results = fetchSuggestions(debouncedValue);
      if (results instanceof Promise) {
        results.then(data => {
          setLoading(false);
          setSuggestions(data);
        });
      } else {
        setSuggestions(results);
      }
    } else {
      setSuggestions([]);
    }
    setHighlightIndex(-1);
  }, [debouncedValue]);

  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key, e.key === " ");
    switch (e.key) {
      case "ArrowUp" /* 上箭头 */:
        highlight(highlightIndex - 1);
        break;
      case "ArrowDown" /* 下箭头 */:
        highlight(highlightIndex + 1);
        break;
      case "Escape" /* ESC键 */:
        setSuggestions([]);
        break;
      case "Enter" /* 回车 */:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case " " /* 空格 */:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex]);
        }
        break;
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true;
    setSuggestions([]);
  };

  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setSuggestions([]);
    // 触发  onSelect
    if (onSelect) onSelect(item);
    triggerSearch.current = false;
  };

  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  // 显示过滤后的数据
  const GenerateDropdown = () => {
    return (
      <Transition in={!loading} timeout={2000} animation='zoom-in-bottom'>
        <ul className='auto-list-wrapper'>
          {suggestions.map((item, index) => {
            const cnames = classNames("suggestion-item", {
              "item-highlighted": index === highlightIndex,
            });
            return (
              <li className={cnames} onClick={() => handleSelect(item)} key={index + "-" + item}>
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };
  return (
    <div className='mini-antd-auto-complete' ref={componentRef}>
      <Input value={inputValue} onChange={handleChange} onKeyDown={handleKeyDown} {...restProps} />
      {loading && (
        <ul>
          <Icon icon='spinner' spin />
        </ul>
      )}
      {suggestions.length > 0 && <GenerateDropdown />}
    </div>
  );
};

export default AutoComplete;
