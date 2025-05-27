import React from "react";
import styles from "./styles.module.css";
import { Logo } from "./components";
import { Button } from "../../common";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/slices/userSlice";

export const Header = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.user.name);
  const token = useSelector((state) => state.user.token);

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    dispatch(logoutUser());
  };

  return (
    <div className={styles.headerContainer}>
      <Logo />
      {token && (
        <div className={styles.userContainer}>
          <p className={styles.userName}>{userName}</p>
          <Button buttonText="LOGOUT" handleClick={handleLogoutClick} />
        </div>
      )}
    </div>
  );
};
