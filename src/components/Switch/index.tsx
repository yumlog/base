import classNames from "classnames/bind";
import React, { useState } from "react";

import styles from "@/components/Switch/index.module.scss";

const cx = classNames.bind(styles);

interface SwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  onClick?: () => void;
}

const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  disabled = false,
  onClick,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    if (disabled) return;
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <label className={cx("switch")} onClick={onClick}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        disabled={disabled}
      />
      <span className={cx("slider")} />
    </label>
  );
};

export default Switch;
