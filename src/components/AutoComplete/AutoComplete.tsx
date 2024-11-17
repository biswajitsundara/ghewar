import React, { useState, useEffect } from "react";
import { useDebouncedFetch } from "./useDebouncedFetch";
import "./AutoComplete.css";

interface AutoCompleteProps<T>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  fetchSuggestions: (query: string) => Promise<T[]>;
  idField: keyof T;
  searchField: keyof T;
  onSuggestionSelect: (selectedItem: T | null) => void;
}

function AutoComplete<T>({
  fetchSuggestions,
  idField,
  searchField,
  onSuggestionSelect,
  ...rest
}: AutoCompleteProps<T>) {
  const [query, setQuery] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(false);

  const { results, loading, error } = useDebouncedFetch<T>({
    query,
    fetchSuggestions,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setQuery(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  // Handle blur event (closing dropdown when focus is lost)
  const handleBlur = () => {
    if (selected) {
      setSelected(false); // Reset the selected flag
      return; // Do not close the dropdown or trigger any other blur logic
    }

    setIsFocused(false);
    setIsOpen(false);
  };

  useEffect(() => {
    query ? setIsOpen(true) : setIsOpen(false);
  }, [query]);

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSelectSuggestion = (result: T) => {
    setInputValue(String(result[searchField]));
    setIsOpen(false);
    setSelected(true);
    onSuggestionSelect(result);
  };

  return (
    <div className={`autocomplete-container ${isFocused ? "focused" : ""}`}>
      <div className="autocomplete-input-wrapper">
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className="autocomplete-input"
          {...rest}
        />
        <div
          className={`arrow ${isOpen ? "open" : ""}`}
          onClick={handleToggleDropdown}
        ></div>
      </div>

      {loading && isOpen && (
        <ul className="suggestion-list">
          <li className="loading">Loading...</li>
        </ul>
      )}

      {error && isOpen && (
        <ul className="suggestion-list">
          <li className="error">{error}</li>
        </ul>
      )}

      {!loading && !error && isOpen && query && (
        <ul className="suggestion-list">
          {results.length > 0 ? (
            results.map((result) => (
              <li
                key={String(result[idField])}
                className={`suggestion-item`}
                onMouseDown={() => handleSelectSuggestion(result)}
              >
                {String(result[searchField])}
              </li>
            ))
          ) : (
            <li className="suggestion-item">No suggestions found</li>
          )}
        </ul>
      )}
    </div>
  );
}

export default AutoComplete;
