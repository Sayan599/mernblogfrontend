import React, { useContext, useState } from 'react'
import './write.css'
import axios from "axios"
import { Context } from '../../context/Context';
import { useNavigate } from 'react-router-dom';

function Write() {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);
    const { user } = useContext(Context);
    const navigate = useNavigate();
    const [category, setCategory] = useState([]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            username: user.username,
            title,
            categories: category,
            desc
        };
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            newPost.photo = filename;
            try {
                await axios.post("https://mernblogbackend.onrender.com/api/upload", data);
            } catch (err) { }
        }
        try {
            const res = await axios.post("https://mernblogbackend.onrender.com/api/posts", newPost);
            navigate("/post/" + res.data._id);
        } catch (err) { }
    };

    const handleChange = (e) => {
        if (e.target.checked) {
            setCategory(
                [...category, e.target.value]
            )
        }
        if (!e.target.checked) {
            setCategory(category.filter((cat) => cat !== e.target.value))
        }
    }

    console.log(category);

    return (
        <div className='write'>
            {
                file && <img src={URL.createObjectURL(file)} alt="" className="writeImg" />
            }
            <form className='writeForm' onSubmit={handleSubmit}>
                <div className='writeFormGroup'>
                    <label htmlFor="fileInput">
                        <i className="writeIcon fa-solid fa-plus"></i>
                    </label>
                    <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                    <input type="text" placeholder='Title' className='writeInput' autoFocus={true} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='writeFormGroup'>
                    <textarea
                        placeholder='Tell your story....'
                        type="text"
                        className="writeInput writeText"
                        onChange={(e) => setDesc(e.target.value)}
                    >
                    </textarea>
                </div>
                <button className="writeSubmit" type='submit'>Publish</button>
            </form>
            <div className="checkboxTitle">Category </div>
            <div className="writeCheckbox">
                <div className="writeCheckboxItem">
                    <input type="checkbox" value="music" onChange={handleChange}></input>
                    <label>Music</label>
                </div>
                <div className="writeCheckboxItem">
                    <input type="checkbox" value="life" onChange={handleChange}></input>
                    <label>Life</label>
                </div>
                <div className="writeCheckboxItem">
                    <input type="checkbox" value="sport" onChange={handleChange}></input>
                    <label>Sport</label>
                </div>
                <div className="writeCheckboxItem">
                    <input type="checkbox" value="casual" onChange={handleChange}></input>
                    <label>Casual</label>
                </div>
            </div>
        </div>
    )
}

export default Write