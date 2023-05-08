import React from "react";
import styles from './Header.module.css';
import { NavLink } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { observer } from "mobx-react";
import { Controller } from "../../types";

const setActive = ({ isActive }: {isActive: boolean}) => isActive ? styles.active : styles.inactive;

export const Header = observer((props: {controller: Controller}) => {
  const {controller} = props;

  return (
    <header className={styles.headerBar}>
      <nav>
        {
          controller.isLoggedIn ?
            <>
              <div className={styles.container}>Hello, <strong>{controller.userName}</strong></div>
              <NavLink to='/' className={setActive}>Home</NavLink>
              <NavLink to='/contacts' className={setActive}>Contacts</NavLink>
              <button onClick={() => {controller.logOutHandler()}} className={styles.btnContainer}>Logout {<LogoutIcon />}</button>
            </> :
            <div className={styles.massage}>Welcome! Please login!</div>
        }

      </nav>
    </header>
  )
});

