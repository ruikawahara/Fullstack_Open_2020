import React, { useState } from 'react'

const ShowButton = () => {
    const [show, setShow] = useState(false)

    return (
        <div style={{ display: 'inline-block' }}>
            <button onClick={() => setShow(!show)}>show</button>
            {/* {`Current status: view is ${show ? 'on' : 'off'}`} */}
        </div>
    )
}


export default ShowButton;