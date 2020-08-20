import React from 'react'
import '../index.css'

const Sucses = ({ msg }) => {
    if (msg === null)
        return null

    return (
        <div className="success">
            {msg}
        </div>
    )
}

const Err = ({ msg }) => {
    if (msg === null)
        return null

    return (
        <div className="error">
            {msg}
        </div>
    )
}

export default { Sucses, Err } 