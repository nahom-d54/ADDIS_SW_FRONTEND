import { useState } from 'react';
import styled from '@emotion/styled';
import { useDispatch, useSelector } from 'react-redux';
import { setUserSlice } from '../redux/slices/user';
import { types } from '../redux/sagas/userSaga';
import { css } from '@emotion/react';
import { Box, Card } from 'rebass';

const RegistrationForm = ({ registerFormActive, setRegisterFormActive }) => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.user )

  const [password, setPassword] = useState('');

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleChange = (prop) => ( event ) => {
    dispatch(setUserSlice({...user, [prop]: event.target.value}))
}

  const handleSubmit = (event) => {
    event.preventDefault();
    const response = dispatch({type: types.REGISTER_USER, payload: {...user, password }})
    console.log(response)    
    dispatch(setUserSlice(
            {
                _id: null,
                username: null,
                email: null,
                firstName: null,
                lastName: null
            }
        ))
 
        console.log("editor")
        //setEditorActive(false)
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
        onClick={() => setRegisterFormActive(!registerFormActive)}
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
      <h2>Registration</h2>
      <label>
        Username:
        <input
          type="text"
          value={user.username}
          onChange={handleChange('username')}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          value={user.email}
          onChange={handleChange('email')}
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
      <label>
        First Name:
        <input
          type="text"
          value={user.firstName}
          onChange={handleChange('firstName')}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={user.lastName}
          onChange={handleChange('lastName')}
        />
      </label>
      <button type="submit">Register</button>
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

export default RegistrationForm;