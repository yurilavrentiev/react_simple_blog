import React from "react";
import styles from './Header.module.css';
import { NavLink } from "react-router-dom";

const setActive = ({isActive}) => isActive ? styles.active : styles.inactive;

const Header = () => {
  return (
    <header className={styles.headerBar}>
      <nav>
        <NavLink to='/' className={setActive}>Home</NavLink>
        <NavLink to='/login' className={setActive}>Login</NavLink> 
        <NavLink to='/contacts' className={setActive}>Contacts</NavLink>  
      </nav>
    </header>
  )
}

export default Header