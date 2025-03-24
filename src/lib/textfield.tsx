"use client";
import { useState, useRef, useEffect } from "react";

interface TextFieldProps {
  label?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
  error?: boolean;
  helperText?: string;
}

const TextField = ({
  label = "Enter text",
  defaultValue = "",
  onChange,
  className = "",
  error = false,
  helperText = "",
}: TextFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    onChange?.(event.target.value);
  };

  const handleLabelClick = () => {
    setIsFocused(true);
    inputRef.current?.focus();
  };

  return (
    <div>
      <div className={`relative w-full group ${className}`}>
        {/* Label */}
        <label
          onClick={handleLabelClick}
          className={`absolute left-4 text-sm font-semibold transition-all duration-300 z-10 cursor-text
            ${isFocused || value ? "-top-[8px] bg-white px-1 text-xs" : "left-4 top-[13px]"} 
            ${isFocused ? "text-primary-c900" : "text-grey-c200"} 
            ${error ? "bg-gradient-to-b from-transparent to-support-c10" : ""}
          `}
        >
          {label}
        </label>

        {/* Input Box */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          className={`w-full border-2 rounded-[20px] px-4 py-3 outline-none transition-all
          ${
            isFocused && !error
              ? "border-primary-c900"
              : error
              ? "border-support-c100 bg-support-c10"
              : "border-grey-c200 group-hover:border-primary-c300"
          }`}
        />
      </div>
      {helperText ? <div className="text-xs mt-0.5 pl-1 text-support-c300">{helperText}</div> : null}
    </div>
  );
};

export default TextField;
