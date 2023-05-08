import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './NotFoundPage.module.css';


export const NotFoundPage = () => {
  const location = useLocation();
  console.log(location)
  return ( 
  <div className={styles.nfPage}>
    <h1>Requested not found! 404</h1>
    <h3>Url address <span>http://lacalhost:3000{location.state.from.pathname}</span> does not exist!</h3>
    <div>
    <NavLink to='/'>Go back to Home Page</NavLink>
    </div>
  </div>
  )
};
