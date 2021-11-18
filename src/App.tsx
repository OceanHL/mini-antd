import React from "react";
import Button from "./components/Button/button";
import Menu from "./components/Menu/menu";
import MenuItem from "./components/Menu/menuItem";
import SubMenu from "./components/Menu/subMenu";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Icon from "./components/Icon/icon";

// fas 把所有图表都引入
library.add(fas);

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Icon icon='coffee' theme='primary' size='10x' />
        <Icon icon='arrow-down' theme='danger' size='10x' />
        <Menu
          defaultIndex='0'
          onSelect={index => {
            console.log(index);
            alert(index);
          }}
          // mode='vertical'
          defaultOpenSubMenus={["2"]}
        >
          <MenuItem>cool link</MenuItem>
          <MenuItem>cool link2</MenuItem>
          <SubMenu title='dropdown'>
            <MenuItem>dropdown 1</MenuItem>
            <MenuItem>dropdown 2</MenuItem>
          </SubMenu>
          <MenuItem>cool link3</MenuItem>
        </Menu>
        <Button
          autoFocus
          onClick={(
            e:
              | React.MouseEvent<HTMLButtonElement, MouseEvent>
              | React.MouseEvent<HTMLAnchorElement, MouseEvent>
          ) => {
            e.preventDefault();
            alert("123");
          }}
          className='custom'
          btnType='default'
        >
          Default
        </Button>
        <Button disabled>Disabled Button</Button>
        <Button btnType='primary' size='lg'>
          Large Primary
        </Button>
        <Button btnType='danger' size='sm'>
          Small Danger
        </Button>
        <Button btnType='link' href='http://www.baidu.com' target='_blank'>
          Baidu Link
        </Button>
        <Button btnType='link' disabled href='http://www.baidu.com'>
          Disabled Link
        </Button>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
