import React, { useContext, useState } from 'react'
import './settings.css'
import Sidebar from '../../components/sidebar/Sidebar'
import { Context } from '../../context/Context'
import axios from 'axios';
import Modal from '../../components/modal/Modal';

function Settings() {
    const PF = "https://mernblogbackend.onrender.com/images/"

    const { user, dispatch } = useContext(Context);
    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [openConfirmModel, setOpenConfirmModal] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedUser = {
            userId: user._id,
            username,
            email,
            password
        }
        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append("name", filename);
            data.append("file", file);
            updatedUser.profilePic = filename;
            try {
                await axios.post("https://mernblogbackend.onrender.com/api/upload", data);
            } catch (err) { }
        }
        try {
            const res = await axios.put("https://mernblogbackend.onrender.com/api/users/" + user._id, updatedUser);
            console.log(res.data);
            setSuccess(true);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });

        } catch (err) { }
    }

    const handleDeleteAccount = async (e) => {
        try {
            await axios.delete("https://mernblogbackend.onrender.com/api/users/" + user._id,
                { data: { userId: user._id } })
            dispatch({ type: "LOGOUT" })
        } catch (err) { }
    }

    const handleConfirm = () => {
        setOpenConfirmModal(true);
    }

    return (
        <div className="settings">
            {
                openConfirmModel && (<Modal handleModal={setOpenConfirmModal}  >
                    <div className="deleteConfirmModal">
                        <h3>Are you sure you want to delete this ?</h3>
                        <p>This change will completely delete all your posts</p>
                        <div className="deleteConfirmModalButton">
                            <button className="buttonCancel" onClick={() => setOpenConfirmModal(false)}>Cancel</button>
                            <button className="buttonConfirm" onClick={handleDeleteAccount}>Confirm</button>
                        </div>
                    </div>
                </Modal>)
            }
            {openModal &&
                <Modal
                    handleModal={setOpenModal}
                    crossButton={true}
                >
                    <img src={file ? URL.createObjectURL(file) : PF + user.profilePic} alt="" className="modalImg" />
                </Modal>

            }


            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Update Your Account</span>
                    <span className="settingsDeleteTitle" onClick={handleConfirm}>Delete Account</span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img
                            src={file ? URL.createObjectURL(file) : PF + user.profilePic}
                            className="settingsPP"
                            onClick={() => setOpenModal(true)}
                        />
                        <label htmlFor="fileInput">
                            <i className="settingsPPIcon fa-regular fa-circle-user"></i>
                        </label>
                        <input type="file" id="fileInput" style={{ display: "none" }} onChange={(e) => setFile(e.target.files[0])} />
                    </div>
                    <label>Username</label>
                    <input type="text" placeholder={user.username} onChange={(e) => setUsername(e.target.value)} />

                    <label>Email</label>
                    <input type="email" placeholder={user.email} onChange={(e) => setEmail(e.target.value)} />

                    <label>Password</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)} />

                    <button className="settingsSubmit" type="submit">Update</button>
                    {success && <div style={{ color: "teal" }}>Successfully Updated</div>}
                </form>

            </div>
            <Sidebar />
        </div>
    )
}

export default Settings