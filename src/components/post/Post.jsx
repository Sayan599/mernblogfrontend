import React, { useEffect } from 'react'
import './post.css'
import { Link } from 'react-router-dom'
import axios from 'axios';


function Post({ post }) {
    const PF = "https://mernblogbackend.onrender.com/images/";
    
    return (
        <div className="post">
            {
                post?.photo &&
                <Link to={`/post/${post?._id}`} className="link">
                    <img className='postImg'
                        src={PF + post?.photo}
                        alt='adasda'
                    />
                </Link>}
            <div className="postInfo">
                <div className='postCats'>
                    {
                        post?.categories.map((p, i) => (
                            <span key={i} className='postCat'>{p}</span>
                        ))
                    }
                </div>
                <Link to={`/post/${post?._id}`} className="link">
                    <span className="postTitle">
                        {post?.title}
                    </span>
                </Link>
                <hr />

                <span className='postDate'>{new Date(post?.createdAt).toDateString()}</span>
            </div>
            <p className='postDesc'>
                {
                    post?.desc
                }
            </p>
        </div>
    )
}

export default Post