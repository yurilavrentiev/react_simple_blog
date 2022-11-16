import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const LoginPage = ({
  setIsLoggedIn,
  setUserName
}) => {

  let navigate = useNavigate();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginChange = (event) => {
    setLogin(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  }

  const handleLogin = (event) => {
    event.preventDefault();

    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userName', login);

    setUserName(login)
    setIsLoggedIn(true);
    navigate('/');
  }

  return (
    <form className='loginForm' onSubmit={handleLogin}>
      <h2>Sign in</h2>
      <div>
        <input 
          type='text' 
          placeholder='login' 
          className='formInputs' 
          onChange={handleLoginChange}
          required/>
      </div>
      <div>
        <input 
          type='password' 
          placeholder='password' 
          className='formInputs' 
          onChange={handlePasswordChange}
          required/>
      </div>
      <div>
        <button type='submit' className='btn'>Login</button>
      </div>
    </form>
  )
}

export default LoginPage;