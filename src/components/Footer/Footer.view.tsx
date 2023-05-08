import React from "react";
import styles from './Footer.module.css';

export const Footer = ({ year }) => {
  return (
    <footer className={styles.footerBar}>
      <span>React Simple Blog - {year}</span>
    </footer>
  )
};

