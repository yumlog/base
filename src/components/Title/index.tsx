import classNames from "classnames/bind";
import type { CSSProperties, ReactNode } from "react";

import RightIcon from "/public/images/icon-14-chevron-right.svg";
import SmallInfoIcon from "/public/images/icon-14-info-light.svg";
import InfoIcon from "/public/images/icon-18-info.svg";
import styles from "@/components/Title/index.module.scss";

const cx = classNames.bind(styles);

interface TitleProps {
  title?: ReactNode;
  description?: ReactNode;
  style?: CSSProperties;
  more?: boolean;
  info?: boolean;
  ad?: boolean;
  nopt?: boolean;
  nopb?: boolean;
  tsize?: number;
  onClick?: () => void;
}

const Title = ({
  title,
  description,
  style,
  more = false,
  info = false,
  ad = false,
  nopt = false,
  nopb = false,
  tsize,
  onClick,
}: TitleProps) => {
  return (
    <div
      className={cx("list-header", { more, info, ad, nopt, nopb })}
      style={style}
    >
      {title && <h2 style={{ fontSize: `${tsize}px` }}>{title}</h2>}
      {description && <p>{description}</p>}
      {more && (
        <button onClick={onClick}>
          자세히 보기
          <RightIcon width={14} height={14} />
        </button>
      )}
      {info && (
        <button onClick={onClick}>
          <InfoIcon width={18} height={18} />
        </button>
      )}
      {ad && (
        <button onClick={onClick}>
          AD
          <SmallInfoIcon width={14} height={14} />
        </button>
      )}
    </div>
  );
};

export default Title;
