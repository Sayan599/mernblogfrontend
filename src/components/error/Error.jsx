import React from 'react'
import './error.css'

function Error() {
  return (
    <div className="error">
        {/* <i className="errorIcon fa-solid fa-bomb"> No Post bro</i> */}
        <i className="errorIcon fa-solid fa-bug"> No Post bro</i>
        <br></br>
        {/* <p className="errorTitle">No Post</p> */}
    </div>
  )
}

export default Error