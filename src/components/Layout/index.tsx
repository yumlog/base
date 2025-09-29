"use client";

import classNames from "classnames/bind";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";

import Button from "@/components/Button";
import styles from "@/components/Layout/index.module.scss";
import NavigationBar from "@/components/NavigationBar";
import TabBar from "@/components/TabBar";
import TopButton from "@/components/TopButton";
import { LayoutContext } from "@/contexts/LayoutContexts";

const cx = classNames.bind(styles);

interface LayoutProps {
  title?: string;
  children: ReactNode;
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
  hasTabBar = true,
  disabled = false,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
}: LayoutProps) => {
  const contentRef = useRef<HTMLElement>(null);
  const [navVisible, setNavVisible] = useState(true);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const target = contentRef.current;
    if (!target) return;

    const handleScroll = () => {
      const currentScrollY = target.scrollTop;
      const maxScroll = target.scrollHeight - target.clientHeight;

      if (currentScrollY >= maxScroll) {
        // 최하단에 도달한 경우
        setNavVisible(false);
        setTabVisible(false);
      } else if (currentScrollY <= 0) {
        // 최상단에 도달한 경우
        setNavVisible(false);
        setTabVisible(false);
      }
    };

    target.addEventListener("scroll", handleScroll, { passive: true });
    return () => target.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <LayoutContext.Provider
      value={{ navVisible, tabVisible, setNavVisible, setTabVisible }}
    >
      <div className={cx("layout")}>
        <NavigationBar
          title={title}
          scrollTarget={contentRef}
          onVisibleChange={setNavVisible}
        />
        <main id="test" ref={contentRef} className={cx("content")}>
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
          <TabBar scrollTarget={contentRef} onVisibleChange={setTabVisible} />
        )}
        <TopButton scrollTarget={contentRef} hasTabBar={tabVisible} />
      </div>
    </LayoutContext.Provider>
  );
};

export default Layout;
