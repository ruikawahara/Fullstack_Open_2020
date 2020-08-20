import React from 'react'
import '../index.css'

const Notification = ({ msg }) => {
    if (msg === null)
        return null

    return (
        <div className="success">
            {msg}
        </div>
    )
}

export default Notification