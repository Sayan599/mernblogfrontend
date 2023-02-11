import React from 'react'
import "./modal.css"

function Modal({ handleModal, crossButton, children }) {
    return (
        <div className="modal" onClick={() => handleModal(false)}>
            {crossButton &&
                <i className="crossIcon fa-solid fa-xmark" onClick={() => handleModal(false)}></i>
            }
            <div className="modalContainer">
                {/* <img src={img} alt="" className="modalImg" /> */}
                {children}
            </div>
        </div>
    )
}

export default Modal