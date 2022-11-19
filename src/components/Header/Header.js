import React from "react";
import styles from './Header.module.css';
import { NavLink } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';

const setActive = ({ isActive }) => isActive ? styles.active : styles.inactive;

const Header = ({ userName, isLoggedIn, setIsLoggedIn }) => {

  const handleLogout = () => {
    localStorage.setItem('isLoggedIn', false);
    localStorage.setItem('userName', '');
    setIsLoggedIn(false);
  }

  return (
    <header className={styles.headerBar}>
      <nav>
        {
          isLoggedIn ?
            <>
              <div className={styles.container}>Hello, <strong>{userName}</strong></div>
              <NavLink to='/' className={setActive}>Home</NavLink>
              <NavLink to='/contacts' className={setActive}>Contacts</NavLink>
              <button onClick={handleLogout} className={styles.btnContainer}>Logout {<LogoutIcon />}</button>
            </> :
            <div className={styles.massage}>Welcome! Please login!</div>
        }

      </nav>
    </header>
  )
}

export default Header;
