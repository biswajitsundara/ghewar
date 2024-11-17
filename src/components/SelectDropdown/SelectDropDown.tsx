import { useState } from "react";
import "./SelectDropDown.css";

interface Option<T> {
  id: string;
  value: T;
}

interface SelectDropDownProps<T> {
  options: { [key: string]: T };
  onSelect: (selectedOption: Option<T>) => void;
}

const SelectDropDown = <T extends Object>({
  options,
  onSelect,
}: SelectDropDownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option<T> | null>(null);

  const handleSelectOption = (id: string, value: T) => {
    const selected = { id, value };
    setSelectedOption(selected);
    setIsOpen(false);
    onSelect(selected);
  };

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleBlur = () => {
    setIsOpen(false);
  };

  const isEmpty = Object.keys(options).length === 0;

  return (
    <div className="select-dropdown-container" onBlur={handleBlur}>
      <div className="select-dropdown-input-wrapper">
        <input
          type="text"
          readOnly
          value={
            selectedOption ? String(selectedOption?.value) : "Select an option"
          }
          className="select-dropdown-input"
          onClick={handleToggleDropdown}
        />
        <div
          className={`arrow ${isOpen ? "open" : ""}`}
          onClick={handleToggleDropdown}
        ></div>
      </div>

      {isOpen && (
        <ul className="select-dropdown-list">
          {isEmpty ? (
            <li className="select-dropdown-item no-options">
              There's nothing to select
            </li>
          ) : (
            Object.entries(options).map(([id, value]) => (
              <li
                key={id}
                className={`select-dropdown-item ${
                  selectedOption?.id === id ? "selected" : ""
                }`}
                onMouseDown={() => handleSelectOption(id, value)}
              >
                {String(value)}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default SelectDropDown;
