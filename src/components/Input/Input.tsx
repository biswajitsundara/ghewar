import React, { ChangeEvent, useState } from "react";
import "./Input.css";

interface Validator {
  minLength?: number;
  maxLength?: number;
  email?: boolean;
  numeric?: boolean;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  required?: boolean;
  label?: string;
  validator?: Validator;
  floatinglabel?: boolean;
  onValidityChange?: (isValid: boolean) => void;
}

const Input = ({
  label,
  onChange,
  placeholder,
  validator = {},
  floatinglabel,
  onValidityChange,
  ...props
}: InputProps) => {
  const [isValid, setIsValid] = useState<boolean>(true);
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => setIsFocused(true);

  const validateField = () => {
    if (Object.keys(validator).length > 0 || props.required) {
      let isValid = true;
      let errorMessage = "";

      // Check for minimum length if applicable
      if (validator.minLength && value.length < validator.minLength) {
        isValid = false;
        errorMessage = `Minimum ${validator.minLength} characters required`;
      }

      if (validator.maxLength && value.length > validator.maxLength) {
        isValid = false;
        errorMessage = `Maximum ${validator.maxLength} characters allowed`;
      }

      // Check for email format if applicable
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (validator.email && !emailRegex.test(value)) {
        isValid = false;
        errorMessage = `Invalid email address`;
      }

      if (validator.numeric && !/^\d+$/.test(value)) {
        isValid = false;
        errorMessage = `Only numeric values are allowed`;
      }

      // Check if the field is required and not empty
      if (props.required && value.trim() === "") {
        isValid = false;
        errorMessage = `This field is required.`;
      }

      // Set the final state after all validations
      setIsValid(isValid);
      setError(errorMessage);

      if (onValidityChange) {
        onValidityChange(isValid);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) onChange(e);
    validateField();
  };

  const handleBlur = () => {
    validateField();
    setIsFocused(value.length > 0); //if the input has atleast one character
  };

  return (
    <div className="input-wrapper">
      <div className={`input-wrapper ${isFocused || value ? "focused" : ""}`}>
        {label && !floatinglabel && <label htmlFor={props.id}>{label}</label>}
        <input
          name={label}
          id={props.id}
          type="text"
          placeholder={floatinglabel ? "" : placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          {...props}
          className={`input-field ${!isValid ? "invalid" : ""}`}
        />
        {floatinglabel && (
          <label className={`floating-label ${!isValid ? "invalid" : ""}`}>
            {label} <sup>*</sup>
          </label>
        )}
        {error && <div className="error-text">{error}</div>}
      </div>
    </div>
  );
};

export default Input;
