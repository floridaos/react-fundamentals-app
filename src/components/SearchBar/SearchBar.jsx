import React from "react";
import styles from "./style.module.css";
import { Input, Button } from "../../common";

export const SearchBar = ({ searchTerm, onSearchTermChange, onSearch }) => {
  return (
    <div className={styles.bar}>
      <Input
        value={searchTerm}
        onChange={(e) => onSearchTermChange(e.target.value)}
      />
      <Button buttonText="Search" handleClick={onSearch} />
    </div>
  );
};
