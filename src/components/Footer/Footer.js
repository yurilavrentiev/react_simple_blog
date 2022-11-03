import React from "react";
import styles from './Footer.module.css';

const Footer = ({ year }) => {
  return (
    <footer className={styles.footerBar}>
      <span>React Simple Blog - {year}</span>
    </footer>
  )
}

export default Footer;