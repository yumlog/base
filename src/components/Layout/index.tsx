"use client";

import classNames from "classnames/bind";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import Button from "@/components/Button";
import styles from "@/components/Layout/index.module.scss";
import NavigationBar from "@/components/NavigationBar";
import TabBar from "@/components/TabBar";
import TopButton from "@/components/TopButton";

const cx = classNames.bind(styles);

interface LayoutProps {
  title?: string;
  children: ReactNode;
  nopt?: boolean;
  nopb?: boolean;
  flex?: boolean;
  hasTabBar?: boolean;
  disabled?: boolean;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
}

const Layout = ({
  title,
  children,
  nopt = false,
  nopb = false,
  flex = false,
  hasTabBar = true,
  disabled = false,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
}: LayoutProps) => {
  const contentRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const target = contentRef.current;
    if (!target) return;

    const handleScroll = () => {
      const currentScrollY = target.scrollTop;
      const maxScroll = target.scrollHeight - target.clientHeight;
      const diff = currentScrollY - lastScrollY.current;

      if (diff > 5 || currentScrollY >= maxScroll) {
        // 아래로 스크롤 하거나 최하단에 도달한 경우
        setVisible(false);
      } else if (diff < -5) {
        // 위로 스크롤
        setVisible(true);
      }

      lastScrollY.current = currentScrollY;
    };

    target.addEventListener("scroll", handleScroll, { passive: true });
    return () => target.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className={cx("layout", { hidden: !visible, nopt, nopb, flex })}>
      <NavigationBar
        title={title}
        scrollTarget={contentRef}
        onVisibleChange={setVisible}
      />
      <main ref={contentRef} className={cx("content")}>
        {children}
      </main>
      {(cancelText || confirmText) && (
        <div className={cx("content-btn")}>
          {confirmText && (
            <Button onClick={onConfirm} disabled={disabled}>
              {confirmText}
            </Button>
          )}
          {cancelText && (
            <Button color="outline" onClick={onCancel} disabled={disabled}>
              {cancelText}
            </Button>
          )}
        </div>
      )}
      {hasTabBar && (
        <TabBar scrollTarget={contentRef} onVisibleChange={setVisible} />
      )}
      <TopButton scrollTarget={contentRef} hasTabBar={visible} />
    </div>
  );
};

export default Layout;
