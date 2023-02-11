import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './register.css'

function Login() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      const res = await axios.post("https://mernblogbackend.onrender.com/api/auth/register", {
        username,
        email,
        password
      });
      res.data && navigate("/login");
      console.log(res);
    } catch (err) {
      setError(true);
    }
  }

  return (
    <div className="register">
      <div className='registerTitle'>Register</div>
      <form className="registerForm" onSubmit={handleSubmit} >
        <label>Username</label>
        <input type="text" className='registerInput' placeholder='Enter your username...' onChange={(e) => setUsername(e.target.value)} />
        <label>Email</label>
        <input type="text" className='registerInput' placeholder='Enter your email...' onChange={(e) => setEmail(e.target.value)} />
        <label>Password</label>
        <input type="password" className='registerInput' placeholder='Enter your password...' onChange={(e) => setPassword(e.target.value)} />
        <button className="registerButton" type="submit">Register</button>
      </form>
      <button className="registerLoginbutton">
        <Link className='link' to="/login">
          Login
        </Link>
      </button>
      {error && <span style={{ color: "red", marginTop: "10px" }}>Something went wrong</span>}

    </div>
  )
}

export default Login