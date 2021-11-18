/*
 * @Author: jhl
 * @Date: 2021-11-18 14:30:11
 * @LastEditors: jhl
 * @LastEditTime: 2021-11-18 14:38:22
 * @Description:
 */
import React from "react";
import { CSSTransition } from "react-transition-group";
import { CSSTransitionProps } from "react-transition-group/CSSTransition";

type AnimationName = "zoom-in-top" | "zoom-in-right" | "zoom-in-bottom" | "zoom-in-left";

type TransitionProps = CSSTransitionProps & {
  animation?: AnimationName;
};

const Transition: React.FC<TransitionProps> = props => {
  const { children, classNames, animation, ...restProps } = props;
  return (
    <CSSTransition classNames={classNames ? classNames : animation} {...restProps}>
      {children}
    </CSSTransition>
  );
};

Transition.defaultProps = {
  unmountOnExit: true,
  appear: true,
};

export default Transition;
