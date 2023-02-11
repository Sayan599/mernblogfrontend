import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Context } from '../../context/Context';
import Sidebar from '../sidebar/Sidebar'
import './singlePost.css'

function SinglePost() {
  const PF = "https://mernblogbackend.onrender.com/images/";
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState({});
  const { user } = useContext(Context);
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [cat, setCat] = useState([]);
  const [storeCat, setStoreCat] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);


  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("https://mernblogbackend.onrender.com/api/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title)
      setDesc(res.data.desc)
      setCat(res.data.categories);
      setStoreCat(res.data.categories);
    }
    fetchData();

  }, [path])

  const handleDelete = async () => {
    try {
      await axios.delete(`https://mernblogbackend.onrender.com/api/posts/${post._id}`, { data: { username: user.username } });
      navigate("/");
    } catch (err) {

    }
  }

  const handleUpdate = async () => {
    try {
      await axios.put(`https://mernblogbackend.onrender.com/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
        categories: cat
      })
      // window.location.reload();
      setUpdateMode(false);
    } catch (err) {

    }
  }
  const handleChange = (e) => {
    if (e.target.checked) {
      setCat(
        [...cat, e.target.value]
      )
    }
    if (!e.target.checked) {
      setCat(cat.filter((cato) => cato !== e.target.value))
    }
  }

  const handleCancel = () => {
    setUpdateMode(false)
    setCat(storeCat);
  }

  return (
    <div className='singlePost'>
      <div className='singlePostWrapper'>
        {
          post.photo && (<img className='singlePostImg' src={PF + post?.photo} alt="" />)

        }
        <div className="singlePostEditContainer">
          {
            updateMode ? <input type="text" value={title} className="singlePostTitleInput" autoFocus onChange={(e) => setTitle(e.target.value)} /> : (
              <>
                <h1 className='singlePostTitle'>
                  {title}
                </h1>
                {
                  (post?.username === user?.username) &&
                  (<div className="singlePostEdit">
                    <i className="singlePostIcon fa-solid fa-pen-to-square" onClick={() => setUpdateMode(true)}></i>
                    <i className="singlePostIcon fa-solid fa-trash" onClick={handleDelete}></i>
                  </div>)
                }
              </>
            )
          }


        </div>
        <div className="singlePostInfo">

          <span className='singlePostAuthor'>Author:
            <Link to={`http://localhost:3000?user=${post.username}`} className="link">
              <b className="singlePostAuthorName">{post?.username}</b>
            </Link>
          </span>

          <span className='singlePostDate'>{new Date(post?.createdAt).toDateString()}</span>
        </div>
        {
          updateMode ? <textarea className="singlePostDescInput" value={desc} onChange={(e) => setDesc(e.target.value)} /> : (
            <p className='singlePostDesc'>
              {desc}
            </p>
          )
        }
        {updateMode && (
          <>
            <button className='singlePostButtonCancel' onClick={handleCancel}>Cancel</button>
            <button className='singlePostButton' onClick={handleUpdate}>Update</button>
          </>
        )}
        {updateMode && <div className='checkbox'>
          <div className="updateCheckboxTitle">Category </div>
          <div className="updateCheckbox">

            <div className="writeCheckboxItem">
              <input type="checkbox" value="music" checked={cat.find((p) => p === 'music') ? true : false} onChange={handleChange}></input>
              <label>Music</label>
            </div>
            <div className="writeCheckboxItem">
              <input type="checkbox" value="life" checked={cat.find((p) => p === 'life') ? true : false} onChange={handleChange}></input>
              <label>Life</label>
            </div>
            <div className="writeCheckboxItem">
              <input type="checkbox" value="sport" checked={cat.find((p) => p === 'sport') ? true : false} onChange={handleChange}></input>
              <label>Sport</label>
            </div>
            <div className="writeCheckboxItem">
              <input type="checkbox" value="casual" checked={cat.find((p) => p === 'casual') ? true : false} onChange={handleChange}></input>
              <label>Casual</label>
            </div>
          </div>
        </div>}
      </div>
      <Sidebar />
    </div>
  )
}

export default SinglePost