import classNames from "classnames/bind";
import type { CSSProperties } from "react";
import React, { useRef, useState } from "react";

import DownIcon from "/public/images/icon-12-chevron-down.svg";
import CheckIcon from "/public/images/icon-24-check.svg";
import Dialog from "@/components/Dialog";
import styles from "@/components/Tabs/index.module.scss";
import { useLayoutContext } from "@/contexts/LayoutContexts";

const cx = classNames.bind(styles);

interface TabsProps {
  tabType?: "underbar" | "block" | "chip" | "chip-sticky";
  tabTitles: string[];
  tabContents: React.ReactNode[];
  inline?: boolean;
  style?: CSSProperties;
  sortTitle?: string;
  sortOptions?: string[];
  defaultSort?: number;
}

const Tabs: React.FC<TabsProps> = ({
  tabType = "underbar",
  tabTitles,
  tabContents,
  inline,
  style,
  sortTitle,
  sortOptions,
  defaultSort,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sortIndex, setSortIndex] = useState<number>(defaultSort ?? 0);
  const tabsRef = useRef<HTMLDivElement>(null);
  const { navVisible } = useLayoutContext();

  return (
    <>
      <div
        ref={tabsRef}
        className={cx("tabs-wrap", tabType, {
          on: tabType === "underbar" ? navVisible : false,
        })}
        style={style}
      >
        <div className={cx("tabs", { inline })}>
          {(tabType === "chip" || tabType === "chip-sticky") &&
            sortTitle &&
            sortOptions && (
              <>
                <button
                  className={cx("sort-chip")}
                  onClick={() => setDialogOpen(true)}
                >
                  {sortOptions[sortIndex]}
                  <DownIcon width={12} height={12} />
                </button>
                <Dialog
                  title={sortTitle}
                  isOpen={dialogOpen}
                  onClose={() => setDialogOpen(false)}
                >
                  <ul className={cx("sort-list")}>
                    {sortOptions.map((option, idx) => (
                      <li
                        key={idx}
                        className={cx({ active: sortIndex === idx })}
                        onClick={() => setSortIndex(idx)}
                      >
                        <span className={cx("option")}>{option}</span>
                        {sortIndex === idx && (
                          <CheckIcon width={24} height={24} />
                        )}
                      </li>
                    ))}
                  </ul>
                </Dialog>
              </>
            )}
          {tabTitles.map((title, index) => {
            if (tabType === "underbar") {
              return (
                <button
                  key={index}
                  className={cx("tab", { active: activeIndex === index })}
                >
                  <span onClick={() => setActiveIndex(index)}>{title}</span>
                </button>
              );
            } else {
              return (
                <button
                  key={index}
                  className={cx("tab", { active: activeIndex === index })}
                  onClick={() => setActiveIndex(index)}
                >
                  <span>{title}</span>
                </button>
              );
            }
          })}
        </div>
      </div>
      <div className={cx("tabs-content")}>{tabContents[activeIndex]}</div>
    </>
  );
};

export default Tabs;
