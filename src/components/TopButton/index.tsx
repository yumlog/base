import classNames from "classnames/bind";
import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

import TopIcon from "/public/images/icon-18-arrow-top.svg";
import styles from "@/components/TopButton/index.module.scss";

const cx = classNames.bind(styles);

interface TopButtonProps {
  scrollTarget?: RefObject<HTMLElement | null>;
  hasTabBar?: boolean;
  bottom?: number;
}

const TopButton = ({
  scrollTarget,
  hasTabBar = true,
  bottom,
}: TopButtonProps) => {
  const [visible, setVisible] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const target = scrollTarget?.current;
    if (!target) return;

    const handleScroll = () => {
      const currentY = target.scrollTop;

      // 스크롤 중에도 top > 0이면 바로 visible
      setVisible(currentY > 0);

      // 기존 타이머 초기화 (스르륵 내릴 때 추가 처리용)
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      // 스크롤 멈춘 후 추가 동작이 필요하면 타이머 유지 (선택 사항)
      scrollTimeout.current = setTimeout(() => {
        setVisible(currentY > 0);
      }, 100);
    };

    // 일반 scroll 이벤트
    target.addEventListener("scroll", handleScroll, { passive: true });
    // iOS swipe scroll 보완용
    target.addEventListener("touchmove", handleScroll, { passive: true });

    // 초기 체크 (처음 로드 시 스크롤이 top이 0이 아닐 수도 있으므로)
    setVisible(target.scrollTop > 0);

    return () => {
      target.removeEventListener("scroll", handleScroll);
      target.removeEventListener("touchmove", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [scrollTarget]);

  const handleClick = () => {
    const target = scrollTarget?.current;
    if (!target) return;

    target.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      className={cx("top-btn", { show: visible, has: hasTabBar })}
      onClick={handleClick}
      style={
        bottom !== undefined
          ? { bottom: `calc(${bottom}px + env(safe-area-inset-bottom))` }
          : undefined
      }
    >
      <span>위로 이동</span>
      <TopIcon width={18} height={18} />
    </button>
  );
};

export default TopButton;
