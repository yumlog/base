import classNames from "classnames/bind";
import Image from "next/legacy/image";
import type { CSSProperties, ReactNode } from "react";
import Lottie from "react-lottie-player";

import Button from "@/components/Button";
import styles from "@/components/NotFound/index.module.scss";

const cx = classNames.bind(styles);

interface NotFoundProps {
  title?: ReactNode;
  description?: ReactNode;
  btnText?: ReactNode;
  style?: CSSProperties;
  imgType?: "img1" | "img2";
  lottieType?: "lottie1";
  full?: boolean;
  layout?: boolean;
  onClick?: () => void;
}

const imageMap = {
  img1: "/images/img-oy-character-notfound.png",
  img2: "/images/img-oy-character-notfound2.png",
};

const lottieMap = {
  lottie1: "/images/lottie-warning.json",
};

const NotFound = ({
  title,
  description,
  btnText,
  imgType = "img1",
  lottieType,
  full = false,
  layout = false,
  onClick,
  style,
}: NotFoundProps) => {
  return (
    <div className={cx("not-found", { full, layout })} style={style}>
      <figure className={cx(lottieType ? lottieType : imgType)}>
        {lottieType ? (
          <Lottie loop play path={lottieMap[lottieType]} />
        ) : (
          <Image
            src={imageMap[imgType]}
            alt=""
            layout="fill"
            objectFit="contain"
          />
        )}
      </figure>
      {title && <p>{title}</p>}
      {description && <small>{description}</small>}
      {btnText && (
        <Button color="white" size="medium" weight="normal" onClick={onClick}>
          {btnText}
        </Button>
      )}
    </div>
  );
};

export default NotFound;
