import classNames from "classnames/bind";
import type { CSSProperties, ReactNode } from "react";
import React, { useState } from "react";

import CancelIcon from "/public/images/icon-24-cancel-solid.svg";
import styles from "@/components/TextField/index.module.scss";

const cx = classNames.bind(styles);

interface TextFieldProps {
  label?: string;
  placeholder?: string;
  errorMessage?: ReactNode;
  style?: CSSProperties;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  placeholder,
  errorMessage,
  style,
}) => {
  const [value, setValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleClear = () => {
    setValue("");
  };

  return (
    <div className={cx("text-field")} style={style}>
      {label && <label className={cx("label")}>{label}</label>}
      <div className={cx("input-wrapper")}>
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          className={cx("input")}
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className={cx("clear-btn")}
          >
            <CancelIcon width={24} height={24} />
          </button>
        )}
      </div>
      {errorMessage && <p className={cx("error-message")}>{errorMessage}</p>}
    </div>
  );
};

export default TextField;
