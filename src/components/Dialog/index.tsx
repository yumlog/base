import classNames from "classnames/bind";
import type { ReactNode } from "react";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import CloseIcon from "/public/images/icon-18-close.svg";
import BackIcon from "/public/images/icon-22-arrow-left.svg";
import InfoIcon from "/public/images/icon-22-info.svg";
import Button from "@/components/Button";
import styles from "@/components/Dialog/index.module.scss";
import TopButton from "@/components/TopButton";

const cx = classNames.bind(styles);

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  type?: "bottomsheet" | "fullscreen" | "modal";
  title?: ReactNode;
  children: ReactNode;
  border?: boolean;
  nopt?: boolean;
  nopb?: boolean;
  flex?: boolean;
  zIndex?: number;
  back?: boolean;
  info?: boolean;
  disabled?: boolean;
  hideHeader?: boolean;
  btnCol?: boolean;
  cancelText?: string;
  confirmText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  onInfo?: () => void;
}

const Dialog = ({
  isOpen,
  onClose,
  type = "bottomsheet",
  title,
  children,
  border = false,
  nopt = false,
  nopb = false,
  flex = false,
  zIndex,
  back = false,
  info = false,
  disabled = false,
  hideHeader = false,
  btnCol = false,
  cancelText,
  confirmText,
  onCancel,
  onConfirm,
  onInfo,
}: DialogProps) => {
  const [root, setRoot] = useState<HTMLElement | null>(null);
  const [visible, setVisible] = useState(isOpen);
  const [animateOpen, setAnimateOpen] = useState(false);
  const [scrollable, setScrollable] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // 브라우저에서만 root 가져오기
  useEffect(() => {
    setRoot(document.body);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
      document.body.style.overflow = "hidden";
      const timer = setTimeout(() => setAnimateOpen(true), 10);
      return () => clearTimeout(timer);
    } else {
      setAnimateOpen(false);
      document.body.style.overflow = "";
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!visible) return;

    const el = contentRef.current;
    if (!el) return;

    const checkScrollable = () => {
      setScrollable(el.scrollHeight > el.clientHeight);
    };

    setTimeout(checkScrollable, 0);
    window.addEventListener("resize", checkScrollable);

    return () => window.removeEventListener("resize", checkScrollable);
  }, [visible, children]);

  if (!visible || !root) return null;

  return createPortal(
    <div className={cx("dialog-wrapper")} style={{ zIndex }}>
      {type !== "fullscreen" && (
        <div
          className={cx("backdrop", { open: animateOpen })}
          onClick={onClose}
        />
      )}
      <article
        data-dialog-type={type}
        data-dialog-open={animateOpen ? "1" : "0"}
        className={cx("dialog", type, {
          open: animateOpen && type !== "fullscreen",
          border,
          nopt,
          nopb,
          flex,
        })}
        role="dialog"
        aria-modal="true"
      >
        {!(type === "fullscreen" && hideHeader) && (
          <header className={cx("dialog-header")}>
            <h2>{title}</h2>
            {type === "fullscreen" ? (
              <>
                {back && (
                  <button
                    className={cx("back-btn")}
                    aria-label="뒤로가기"
                    onClick={onClose}
                  >
                    <BackIcon width={22} height={22} />
                  </button>
                )}
                {info && (
                  <button
                    className={cx("info-btn")}
                    aria-label="안내"
                    onClick={onInfo}
                  >
                    <InfoIcon width={22} height={22} />
                  </button>
                )}
                {!back && !info && (
                  <button
                    className={cx("close-btn")}
                    onClick={onClose}
                    aria-label="닫기"
                  >
                    <CloseIcon width={22} height={22} />
                  </button>
                )}
              </>
            ) : (
              <button
                className={cx("close-btn")}
                onClick={onClose}
                aria-label="닫기"
              >
                <CloseIcon width={18} height={18} />
              </button>
            )}
          </header>
        )}
        <section
          ref={contentRef}
          className={cx("dialog-content", { scroll: scrollable })}
        >
          {children}
        </section>
        {(cancelText || confirmText) && (
          <div className={cx("dialog-btn", { col: btnCol })}>
            {cancelText && (
              <Button
                color="white"
                onClick={onCancel ?? onClose}
                disabled={disabled}
              >
                {cancelText}
              </Button>
            )}
            {confirmText && (
              <Button onClick={onConfirm} disabled={disabled}>
                {confirmText}
              </Button>
            )}
          </div>
        )}
        {type === "fullscreen" && (
          <TopButton scrollTarget={contentRef} hasTabBar={false} />
        )}
      </article>
    </div>,
    root
  );
};

export default Dialog;
