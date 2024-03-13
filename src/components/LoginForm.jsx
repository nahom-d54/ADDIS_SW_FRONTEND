import { useState } from 'react';
import styled from '@emotion/styled'
import { useDispatch } from 'react-redux';
import { Box, Card } from 'rebass';
import { css } from '@emotion/react';
import { types } from '../redux/sagas/userSaga';

const LoginForm = ({ loginFormActive, setLoginFormActive }) => {
    const dispatch = useDispatch()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login logic here
    //console.log(event)
    // loginUser({username, password})
    dispatch({type: types.LOGIN_USER, payload: {username, password} })
    setLoginFormActive(!loginFormActive)
  };

  return (
    <Box css={css`
        position: absolute;
        width:100vw;
        height: 100vh;
        left: 0;
        top: 0;

    `}>
        
        
        
        <Box css={css`
        position: absolute;
        width: 100vw;
        height: 100vh;
        z-index: 1;
        background: #000;
        opacity: 0.7;`}
        onClick={() => setLoginFormActive(!loginFormActive)}
        />
    <Card css={css`
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 10;
            background-color: #191918;
            padding: 1.5rem;
            border-radius: 10px;
            min-width: 300px;
            `}>  
        <StyledForm onSubmit={handleSubmit}>
        <h2>Login</h2>
        <label>
            Username:
            <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            />
        </label>
        <label>
            Password:
            <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            />
        </label>
        <button type="submit">Submit</button>
        </StyledForm>
    </Card>
    
    </Box>
  );
};

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;

  h2 {
    margin-bottom: 1rem;
  }

  label {
    margin-bottom: 0.5rem;
  }

  input {
    padding: 0.5rem;
    margin-bottom: 1rem;
    width: 250px;
  }

  button {
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
  }
`;

export default LoginForm;