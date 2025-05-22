// Module 1:
// * add Logo and Button components
// * add Header component to the App component
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-1/home-task/components#header

// Module 2:
// * show user's name if he is logged in (use selector from store/selectors.js to get user token from store)
// * navigate to the /login route after 'LOGOUT' button click
// * hide 'LOGOUT' button and user's name for Login and Registration pages
// * remove token from localStorage by LOGOUT button click.
// ** PAY ATTATION ** token should be removed from localStorage immediately inside logout handler function
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-2/home-task/components#header
// src/components/Header/Header.js
import React from "react";
import styles from "./styles.module.css";
import { Logo } from "./components";
import { Button } from "../../common";

export const Header = ({ userName = "Harry Potter", onLogout }) => {
  const token = localStorage.getItem("token");

  const handleLogoutClick = () => {
    localStorage.removeItem("token");
    if (onLogout) onLogout();
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
// Module 3:
// * use selector from store/selectors.js to get user's name from the store
// * remove user's data from the store. Use action 'removeUserData' from the 'src/store/slices/userSlice by LOGOUT button click
// * remove token from localStorage by LOGOUT button click.
// ** PAY ATTATION ** token should be removed from localStorage immediately inside logout handler function
// ** TASK DESCRIPTION ** - https://react-fundamentals-tasks.vercel.app/docs/module-3/home-task/components#header

// Module 4:
// make a request to lod out on 'LOGOUT' button click
// use thunk 'logoutThunk' from 'src/store/thunks/userThunk.js' and service 'logout' from 'src/services.js'
// ** PAY ATTATION ** token should be removed from localStorage immediately inside logout handler function

// Module 5:
// *proposed cases for unit tests:
//   ** Header should have logo and user's name.
