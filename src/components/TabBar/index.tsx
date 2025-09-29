import classNames from "classnames/bind";
import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

import CategoryIcon from "/public/images/icon-20-category.svg";
import FindIcon from "/public/images/icon-20-find.svg";
import HomeIcon from "/public/images/icon-20-home.svg";
import LikeIcon from "/public/images/icon-20-like.svg";
import MyIcon from "/public/images/icon-20-my.svg";
import StoreIcon from "/public/images/icon-20-store.svg";
import styles from "@/components/TabBar/index.module.scss";

const cx = classNames.bind(styles);

interface TabBarProps {
  scrollTarget?: RefObject<HTMLElement | null>;
  onVisibleChange?: (visible: boolean) => void;
}

const TabBar = ({ scrollTarget, onVisibleChange }: TabBarProps) => {
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const target = scrollTarget?.current;
    if (!target) return;

    const handleScroll = () => {
      const currentScrollY = target.scrollTop;

      if (currentScrollY > lastScrollY.current) {
        // 아래로 스크롤
        setHidden(true);
        onVisibleChange?.(false);
      } else if (currentScrollY < lastScrollY.current) {
        // 위로 스크롤
        setHidden(false);
        onVisibleChange?.(true);
      }

      lastScrollY.current = currentScrollY;
    };

    target.addEventListener("scroll", handleScroll, { passive: true });
    return () => target.removeEventListener("scroll", handleScroll);
  }, [scrollTarget, onVisibleChange]);

  return (
    <footer className={cx("tab-bar-wrap", { hidden })}>
      <nav className={cx("tab-bar")}>
        <button className={cx("tab-bar-item")}>
          <HomeIcon width={20} height={20} />
          <span>홈</span>
        </button>
        <button className={cx("tab-bar-item")}>
          <CategoryIcon width={20} height={20} />
          <span>카테고리</span>
        </button>
        <button className={cx("tab-bar-item")}>
          <FindIcon width={20} height={20} />
          <span>발견</span>
        </button>
        <button className={cx("tab-bar-item")}>
          <StoreIcon width={20} height={20} />
          <span>위치</span>
        </button>
        <button className={cx("tab-bar-item")}>
          <LikeIcon width={20} height={20} />
          <span>좋아요</span>
        </button>
        <button className={cx("tab-bar-item")}>
          <MyIcon width={20} height={20} />
          <span>마이</span>
        </button>
      </nav>
    </footer>
  );
};

export default TabBar;
