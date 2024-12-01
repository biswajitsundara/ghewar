import { useState, useEffect } from "react";
import "./Checkbox.css";

interface CheckboxProps {
  label: string;
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  id: string;
}

const Checkbox = ({ label, checked = false, onChange, id }: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(checked);

  const handleChange = () => {
    setIsChecked((prevChecked) => !prevChecked);
  };

  useEffect(() => {
    if (onChange) {
      onChange(isChecked);
    }
  }, [isChecked]);

  return (
    <div className="checkbox-container">
      <input
        type="checkbox"
        id={id}
        checked={isChecked}
        onChange={handleChange}
        className="checkbox-input"
      />
      <label htmlFor={id} className="checkbox-label">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
