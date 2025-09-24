import classNames from "classnames/bind";
import type { ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";
import React, { forwardRef } from "react";

import styles from "@/components/Button/index.module.scss";

const cx = classNames.bind(styles);

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "fill" | "outline" | "white" | "transparent";
  size?: "small" | "medium" | "large";
  weight?: "bold" | "normal";
  block?: boolean;
  rounded?: boolean;
  children: ReactNode;
  style?: CSSProperties;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      color = "fill",
      size = "large",
      weight = "bold",
      block = false,
      rounded = false,
      children,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={cx("btn", color, size, weight, { block, rounded })}
        style={style}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
