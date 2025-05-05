import React from "react";
import styles from "./styles.module.css";
import { Logo } from "./components";
import { Button } from "../../common";

export const Header = () => {
  const handleLogout = () => {
    window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
  };

  return (
    <div className={styles.headerContainer}>
      <Logo />
      <div className={styles.userContainer}>
        <p className={styles.userName}>Maksym</p>
        <Button buttonText="LOGOUT" handleClick={handleLogout} />
      </div>
    </div>
  );
};
