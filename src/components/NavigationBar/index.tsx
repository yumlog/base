import classNames from "classnames/bind";
import Image from "next/legacy/image";
import type { RefObject } from "react";
import { useEffect, useRef, useState } from "react";

import BackIcon from "/public/images/icon-22-arrow-left.svg";
import HistoryIcon from "/public/images/icon-22-history.svg";
import HomeIcon from "/public/images/icon-22-home.svg";
// import SettingIcon from "/public/images/icon-22-setting.svg";
import styles from "@/components/NavigationBar/index.module.scss";

const cx = classNames.bind(styles);

interface NavigationBarProps {
  title?: string;
  scrollTarget?: RefObject<HTMLElement | null>;
  onVisibleChange?: (visible: boolean) => void;
}

const NavigationBar = ({
  title,
  scrollTarget,
  onVisibleChange,
}: NavigationBarProps) => {
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
    <header className={cx("navigation-bar-wrap", { hidden })}>
      <div className={cx("navigation-bar")}>
        <div className={cx("btn-wrap", "left")}>
          <button aria-label="뒤로가기" onClick={() => window.history.go(-1)}>
            <Image src={BackIcon} alt="" width={22} height={22} />
          </button>
        </div>
        <h1 className={cx("title")}>{title}</h1>
        <div className={cx("btn-wrap", "right")}>
          <button aria-label="히스토리">
            <Image src={HistoryIcon} alt="" width={22} height={22} />
          </button>
          <button aria-label="홈">
            <Image src={HomeIcon} alt="" width={22} height={22} />
          </button>
          {/* <button aria-label="설정">
            <Image src={SettingIcon} alt="" width={22} height={22} />
          </button> */}
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
