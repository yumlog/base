import classNames from "classnames/bind";
import Image from "next/legacy/image";
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
      const maxScroll = target.scrollHeight - target.clientHeight;
      const diff = currentScrollY - lastScrollY.current;

      if (diff > 5 || currentScrollY >= maxScroll) {
        // 아래로 스크롤 하거나 최하단에 도달한 경우
        setHidden(true);
        onVisibleChange?.(false);
      } else if (diff < -5) {
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
          <Image src={HomeIcon} alt="" width={20} height={20} />
          <span>홈</span>
        </button>
        <button className={cx("tab-bar-item")}>
          <Image src={CategoryIcon} alt="" width={20} height={20} />
          <span>카테고리</span>
        </button>
        <button className={cx("tab-bar-item")}>
          <Image src={FindIcon} alt="" width={20} height={20} />
          <span>발견</span>
        </button>
        <button className={cx("tab-bar-item")}>
          <Image src={StoreIcon} alt="" width={20} height={20} />
          <span>올영매장</span>
        </button>
        <button className={cx("tab-bar-item")}>
          <Image src={LikeIcon} alt="" width={20} height={20} />
          <span>좋아요</span>
        </button>
        <button className={cx("tab-bar-item")}>
          <Image src={MyIcon} alt="" width={20} height={20} />
          <span>마이</span>
        </button>
      </nav>
    </footer>
  );
};

export default TabBar;
