"use client";
import { useState, useRef, useEffect } from "react";

interface TextAreaProps {
  label?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  cols?: number;
  rows?: number;
  error?: boolean;
  helperText?: string;
  inputClassName?: string;
  value?: string;
  onBlur?: () => void;
}

const TextArea = ({
  label = "Enter text",
  defaultValue = "",
  onChange,
  className = "",
  cols = 4,
  rows = 3,
  error = false,
  helperText = "",
  inputClassName = "",
  value: controlledValue,
  onBlur,
}: TextAreaProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (inputRef.current && !inputRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setInternalValue(newValue);
    onChange?.(newValue);
  };

  const handleBlur = () => {
    setIsFocused(false);
    onBlur?.();
  };

  const handleLabelClick = () => {
    setIsFocused(true);
    inputRef.current?.focus();
  };

  // Use controlled value if provided, otherwise use internal state
  const displayValue = controlledValue ?? internalValue;

  return (
    <div>
      <div className={`relative w-full group ${className}`}>
        {/* Label */}
        <label
          onClick={handleLabelClick}
          className={`absolute left-4 text-sm font-semibold transition-all duration-300 z-10 cursor-text
            ${isFocused || displayValue ? "-top-[8px] bg-white px-1 text-xs" : "left-4 top-[14px]"} 
            ${isFocused ? "text-primary-c900" : "text-grey-c200"}
            ${error ? "bg-gradient-to-b from-transparent to-support-c10" : ""}
          `}
        >
          {label}
        </label>

        {/* Input Box */}
        <textarea
          cols={cols}
          rows={rows}
          ref={inputRef}
          value={displayValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          className={`w-full border-2 rounded-[20px] px-4 py-3 outline-none transition-all focus:border-primary-c900
            ${
              isFocused && !error
                ? "border-primary-c900"
                : error
                ? "border-support-c100 bg-support-c10"
                : "border-grey-c200 group-hover:border-primary-c300"
            }
            ${inputClassName}
          `}
        />
      </div>
      {helperText ? <div className="text-xs pl-1 text-support-c300">{helperText}</div> : null}
    </div>
  );
};

export default TextArea;
