import React from "react";
import { SearchIcon, XIcon } from "@heroicons/react/outline";
import "./Search.css";
import CustomInput from "../inputs/CustomInput";
const Search = ({ value, onChange, onClear }) => {
  return (
    <div className="search-container">
      <SearchIcon className="search-icon" />
      <CustomInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search..."
        className="search-input"
      />

      {value && <XIcon className="clear-icon" onClick={onClear} />}
    </div>
  );
};

export default Search;
