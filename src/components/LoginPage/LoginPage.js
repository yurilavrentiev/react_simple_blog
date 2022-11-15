import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = (props) => {

  let navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();
    navigate('/');
  }

  return (
    <form className='loginForm' onSubmit={handleLogin}>
      <h2>Sign in</h2>
      <div>
        <input type='text' placeholder='login' className='formInputs' required/>
      </div>
      <div>
        <input type='password' placeholder='password' className='formInputs' required/>
      </div>
      <div>
        <button type='submit' className='btn'>Login</button>
      </div>
    </form>
  )
}

export default LoginPage;