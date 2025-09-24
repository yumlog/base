import classNames from "classnames/bind";
import { useEffect, useRef, useState } from "react";

import styles from "@/components/Skeleton/index.module.scss";

const cx = classNames.bind(styles);

interface SkeletonProps {
  loading: React.ReactElement;
  content: React.ReactElement;
  duration?: number;
  block?: boolean;
  flex?: boolean;
  bg?: boolean;
  onStart?: () => void;
  onFinish?: () => void;
}

const Skeleton = ({
  loading,
  content,
  duration = 2000,
  block = false,
  flex = false,
  bg = false,
  onStart,
  onFinish,
}: SkeletonProps) => {
  const [showSkeleton, setShowSkeleton] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const onStartRef = useRef(onStart);
  const onFinishRef = useRef(onFinish);
  onStartRef.current = onStart;
  onFinishRef.current = onFinish;

  // 클라이언트인지 확인
  useEffect(() => {
    setIsClient(true);
  }, []);

  // 스켈레톤 시작 & 종료 처리
  useEffect(() => {
    if (!isClient || !showSkeleton) return;

    // 시작 시
    document.body.style.overflow = "hidden";
    onStartRef.current?.();

    const timer = setTimeout(() => {
      setShowSkeleton(false);
      document.body.style.overflow = "";
      onFinishRef.current?.();
    }, duration);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [isClient, showSkeleton, duration]);

  return showSkeleton ? (
    <div className={cx("skeleton", { block, flex, bg })}>{loading}</div>
  ) : (
    content
  );
};

export default Skeleton;
