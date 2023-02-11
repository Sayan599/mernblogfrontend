import React, { useContext, useState } from 'react'
import "./topbar.css"
import { Link, useNavigate } from 'react-router-dom'
import { Context } from '../../context/Context'

function TopBar() {
  const PF = "https://mernblogbackend.onrender.com/images/"
  const { user, dispatch } = useContext(Context);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate('/?user=' + input);
    }
  }

  return (
    <div className="top">
      <div className='topLeft'>
        <i className="topIcon fa-brands fa-facebook"></i>
        <i className="topIcon fa-brands fa-instagram"></i>
        <i className="topIcon fa-brands fa-pinterest"></i>
        <i className="topIcon fa-brands fa-twitter"></i>
      </div>
      <div className='topCentre'>
        <ul className="topList">
          <li className='topListItem'><Link className="link" to="/">HOME</Link></li>
          <li className='topListItem'><Link className="link" to="/">ABOUT</Link></li>
          <li className='topListItem'><Link className="link" to="/">CONTRACT</Link></li>
          <li className='topListItem'><Link className="link" to="/write">WRITE</Link></li>
          <li className='topListItem' onClick={handleLogout}>
            {user && "LOGOUT"}
          </li>
        </ul>
      </div>
      <div className='topRight'>
        {
          user ? (
            <>
              <div>Hi, {user?.username} </div>
              <Link to="/settings">
                {user?.profilePic ? (<img className='topImg' src={PF + user?.profilePic} alt="" ></img>) : <i className="topImg fa-solid fa-user-astronaut"></i>}
              </Link>
            </>
          )
            :
            (
              <>
                <ul className="topList">
                  <li className='topListItem'><Link className='link' to="/login">LOGIN</Link></li>
                  <li className='topListItem'><Link className='link' to="/register">REGISTER</Link></li>
                </ul>
              </>
            )
        }

        <i className="topSearchIcon  fa-solid fa-magnifying-glass"></i>
        <input className='topSearch' spellCheck={false} type="text" onKeyDown={handleKeyDown} onChange={(e) => setInput(e.target.value)}></input>
      </div>
    </div>
  )
}

export default TopBar