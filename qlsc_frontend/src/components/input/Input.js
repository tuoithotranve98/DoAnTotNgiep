import React, {useRef} from "react";

import "./styles.scss";

function Input(props) {
  const { onFocus, setChildRef } = props;
  const inputRef = useRef("");
  const onClickFocus = () => {
    if (onFocus && typeof onFocus === "function") {
      inputRef && inputRef.current.focus();
      onFocus();
    }
  };

  const {
    value,
    onChange,
    placeHolder,
    className,
    prefix,
    suffix,
    onBlur = () => {},
    error,
    id,
    type,
    autoFocus,
    wrapperClass = "",
  } = props;
  const classname = `position-relative d-flex align-items-center common-input ${wrapperClass}`;
  return (
    <div className={classname}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeHolder}
        className={className}
        onBlur={onBlur}
        onFocus={onClickFocus}
        data-tip
        data-for={id}
        id={id}
        ref={inputRef}
        onScroll={(e) => e.stopPropagation()}
        autoComplete="off"
      />
      {prefix !== undefined ? (
        prefix
      ) : (
        <div className="position-absolute input-prefix-common">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z"
              stroke="#C4C4C4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M15.7498 15.75L12.4873 12.4875"
              stroke="#C4C4C4"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      )}
      {suffix}
    </div>
  );
}

Input.defaultProps = {
  setChildRef: () => {},
};

export default Input;
