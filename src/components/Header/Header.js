import React from "react";
import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.headerBar}>
      <nav>
        <p>Home</p>
        <p>Sign in</p>
        <p>Contact</p>
      </nav>
    </header>
  )
}

export default Header