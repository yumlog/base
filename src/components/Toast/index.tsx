import classNames from "classnames/bind";
import type { ReactNode } from "react";
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";

import styles from "@/components/Toast/index.module.scss";

const cx = classNames.bind(styles);

interface ToastProps {
  children: ReactNode;
  bottom?: number;
  small?: boolean;
  sheet?: boolean;
  btnText?: string;
  onClick?: () => void;
}

export interface ToastHandle {
  show: () => void;
}

const Toast = forwardRef<ToastHandle, ToastProps>(
  (
    { children, bottom, small = false, sheet = false, btnText, onClick },
    ref
  ) => {
    const [root, setRoot] = useState<HTMLElement | null>(null);
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);
    const [sheetBottom, setSheetBottom] = useState<number | undefined>(
      undefined
    );
    const timerRef = useRef<number | null>(null);

    // 브라우저에서만 root 가져오기
    useEffect(() => {
      setRoot(document.body);
    }, []);

    useImperativeHandle(ref, () => ({
      show: () => {
        setMounted(true);

        requestAnimationFrame(() => {
          setVisible(true);

          // 기존 타이머 제거
          if (timerRef.current) {
            clearTimeout(timerRef.current);
          }

          // 새로운 타이머 등록
          timerRef.current = window.setTimeout(() => {
            setVisible(false);
            timerRef.current = null;
          }, 3000);
        });
      },
    }));

    useEffect(() => {
      if (!visible && mounted) {
        const timer = setTimeout(() => setMounted(false), 300);
        return () => clearTimeout(timer);
      }
      return undefined; // 모든 경로에서 return 존재
    }, [visible, mounted]);

    useEffect(() => {
      if (!sheet) return;

      const sheetEl = document.querySelector<HTMLElement>(
        'article[data-dialog-type="bottomsheet"]'
      );
      if (!sheetEl) return;

      const observer = new ResizeObserver(() => {
        const height = sheetEl.offsetHeight;
        setSheetBottom(height + 15);
      });

      observer.observe(sheetEl);

      // 초기 실행
      setSheetBottom(sheetEl.offsetHeight + 15);

      return () => observer.disconnect();
    }, [sheet]);

    if (!mounted || !root) return null;

    return createPortal(
      <div
        className={cx("toast", { show: visible, hide: !visible, small })}
        style={{ bottom: `${sheet ? sheetBottom : bottom ?? 15}px` }}
      >
        <p>{children}</p>
        {btnText && <button onClick={onClick}>{btnText}</button>}
      </div>,
      root
    );
  }
);

Toast.displayName = "Toast";

export default Toast;
