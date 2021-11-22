/*
 * @Author: jhl
 * @Date: 2021-11-18 15:58:28
 * @LastEditors: jhl
 * @LastEditTime: 2021-11-22 15:12:37
 * @Description:
 */
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { withInfo } from "@storybook/addon-info";
import "../../styles/index.scss";
import Button from "./button";
import React from "react";

const styles: React.CSSProperties = {
  textAlign: "center",
  display: "flex",
  alignItems: "center",
};

const CenterDecorator = (storyFn: any) => <div style={styles}>{storyFn()}</div>;

const DefaultButton = () => <Button onClick={action("clicked")}>default button</Button>;

const ButtonWithSize = () => (
  <>
    <Button>default button</Button>
    <Button size='sm'>sm button</Button>
    <Button size='lg'>large button</Button>
  </>
);

const ButtonWithType = () => (
  <>
    <Button btnType='default'>default button</Button>
    <Button btnType='primary'>primary button</Button>
    <Button btnType='danger'>danger button</Button>
    <Button btnType='link' href='http://www.baidu.com'>
      link button
    </Button>
  </>
);

storiesOf("Button Component", module)
  .addDecorator(CenterDecorator)
  // @ts-ignore
  .addDecorator(withInfo)
  .addParameters({
    info: {
      inline: true,
    },
  })
  // .addParameters({
  //   info: {
  //     text: `
  //       # 这是一个非常 nice 的组件
  //       ~~~js
  //       const a = 'hello';
  //       ~~~
  //     `,
  //     inline: true,
  //   },
  // })
  .add("Button", DefaultButton)
  .add("不同尺寸的 Button", ButtonWithSize, {
    info: {
      inline: false,
    },
  })
  .add("不同类型 Button", ButtonWithType);
