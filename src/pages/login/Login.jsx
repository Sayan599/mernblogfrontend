import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import './login.css'
import { useRef } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';

function Login() {

  const userRef = useRef();
  const passwordRef = useRef();
  const { user, dispatch, isFetching } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("https://mernblogbackend.onrender.com/api/auth/login", 
      {
        username: userRef.current.value,
        password: passwordRef.current.value
      }
      )
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" })
    }
  }

  return (
    <div className="login">
      <div className='loginTitle'>Login</div>
      {isFetching && <div>Loading <i className="fa-solid fa-spinner"></i></div>}
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input type="text" placeholder='Enter your username...' ref={userRef} />
        <label>Password</label>
        <input type="password" placeholder='Enter your password...' ref={passwordRef} />
        <button className="loginButton" type="submit">Login</button>
      </form>
      <button className="loginRegisterbutton">
        <Link className='link' to="/register">Register</Link>
      </button>
    </div>
  )
}

export default Login