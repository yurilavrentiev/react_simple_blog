import styles from './LoginPage.module.css';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { Controller } from '../../types';
import { observer } from 'mobx-react';


export const LoginPage = observer((props: {controller: Controller}) => {
	const {controller} = props;
  let navigate = useNavigate();

  const handleLogin = (event) => {
    controller.signInHandler(event);
    navigate('/');
  }

  return (
		<form className={styles.loginForm} onSubmit={handleLogin}>
			<h2>Sign in</h2>
			<div>
				<input
					value={controller.loginInputValue}
					type="text"
					placeholder="login"
					className={styles.formInputs}
					onChange={(event) => {controller.loginChangeHandler(event)}}
					required
				/>
			</div>
			<div>
				<input
					value={controller.passwordInputValue}
					type="password"
					placeholder="password"
					className={styles.formInputs}
					onChange={(event) => {controller.passwordChangeHandler(event)}}
					required
				/>
			</div>
			<div>
				<button type="submit" className={styles.btn}>
					Login
				</button>
			</div>
		</form>
	);
});

