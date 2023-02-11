import React, { useEffect, useState } from 'react'
import Header from '../../components/header/Header'
import Posts from '../../components/posts/Posts'
import Sidebar from '../../components/sidebar/Sidebar'
import './home.css'
import axios from "axios";
import { useLocation } from 'react-router-dom'
import Error from '../../components/error/Error'

function Home() {
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get(`https://mernblogbackend.onrender.com/api/posts/${location.search}`);
      setPosts(res.data);
    }
    fetchPosts();
  }, [location.search]);

  return (
    <>
      <Header />
      <div className='home'>
        { (posts.length === 0) ? <Error/> : <Posts  posts={posts} />}
        <Sidebar />
      </div>
    </>
  )
}

export default Home