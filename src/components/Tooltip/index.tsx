"use client";

import classNames from "classnames/bind";
import React, { useEffect, useRef, useState } from "react";

import styles from "@/components/Tooltip/index.module.scss";

const cx = classNames.bind(styles);

interface TooltipProps {
  children: React.ReactNode; // 버튼이나 div 등 한 개 요소
  autoHide?: boolean;
  duration?: number;
  position?: "top" | "bottom";
  anchor?: "left" | "center" | "right";
  content: React.ReactNode; // 툴팁 내용
  offset?: number;
  width?: number | string;
  floating?: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  autoHide = true,
  duration = 3000,
  position = "top",
  anchor = "center",
  content,
  offset = 0,
  width,
  floating = false,
}) => {
  const targetRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const timerRef = useRef<number | null>(null);

  // 브라우저에서만 root 가져오기
  useEffect(() => {
    setRoot(document.body);
  }, []);

  // 클릭 시 툴팁 표시
  const handleClick = () => {
    setMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));

    if (autoHide) {
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setVisible(false);
        timerRef.current = null;
      }, duration);
    }
  };

  // visible=false → 트랜지션 후 unmount
  useEffect(() => {
    if (!visible && mounted) {
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [visible, mounted]);

  // 위치 계산
  const [style, setStyle] = useState<React.CSSProperties>({});
  useEffect(() => {
    if (!mounted || !targetRef.current || !tooltipRef.current) return;

    const targetEl = targetRef.current;
    const tooltipEl = tooltipRef.current;

    const arrowSize = 6; // 툴팁 화살표 높이
    const targetHeight = targetEl.offsetHeight;
    const targetWidth = targetEl.offsetWidth;
    const tooltipWidth = tooltipEl.offsetWidth;
    const tooltipHeight = tooltipEl.offsetHeight;

    const top =
      position === "top"
        ? -tooltipHeight - arrowSize
        : targetHeight + arrowSize;

    const left =
      anchor === "left"
        ? 0
        : anchor === "center"
          ? targetWidth / 2 - tooltipWidth / 2
          : targetWidth - tooltipWidth;

    setStyle({
      top,
      left,
      width: typeof width === "number" ? `${width}px` : width,
    });
  }, [mounted, position, anchor, offset, width]);

  if (!root) return children;

  return (
    <div
      ref={targetRef}
      className={cx("tooltip-wrapper")}
      onClick={handleClick}
    >
      {children}
      {mounted && (
        <div
          ref={tooltipRef}
          className={cx("tooltip", position, anchor, {
            show: visible,
            hide: !visible,
            floating,
          })}
          style={style}
        >
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
