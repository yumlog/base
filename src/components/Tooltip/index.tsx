"use client";

import classNames from "classnames/bind";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";

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

    const tooltipEl = tooltipRef.current;
    const targetRect = targetRef.current.getBoundingClientRect();

    const updatePosition = () => {
      const tooltipRect = tooltipEl.getBoundingClientRect();
      const arrowSize = 6;
      const totalOffset = offset + arrowSize;
      const top =
        position === "top"
          ? targetRect.top - tooltipRect.height - totalOffset
          : targetRect.bottom + totalOffset;
      const left =
        anchor === "left"
          ? targetRect.left
          : anchor === "center"
          ? targetRect.left + targetRect.width / 2 - tooltipRect.width / 2
          : targetRect.right - tooltipRect.width;

      setStyle({
        top: top + window.scrollY,
        left: left + window.scrollX,
        width: typeof width === "number" ? `${width}px` : width,
      });
    };

    requestAnimationFrame(updatePosition);
  }, [mounted, position, anchor, offset, width]);

  if (!root) return children;

  return (
    <>
      {/* wrapper div로 ref와 클릭 처리 */}
      <div
        ref={targetRef}
        onClick={handleClick}
        style={{ display: "inline-block" }}
      >
        {children}
      </div>

      {mounted &&
        ReactDOM.createPortal(
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
          </div>,
          root
        )}
    </>
  );
};

export default Tooltip;
