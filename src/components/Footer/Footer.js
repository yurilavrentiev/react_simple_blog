import React from "react";
import './Footer.css';

const Footer = ({ year }) => {
  return (
    <footer>
      <span>React Simple Blog - {year}</span>
    </footer>
  )
}

export default Footer;