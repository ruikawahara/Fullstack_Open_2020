import React, { useState } from 'react'
import OneMatch from './OneMatch';

const ShowButton = ({ countryObject }) => {
    const [show, setShow] = useState(false)

    return (
        <div style={{ display: 'inline-block' }}>
            <button onClick={() => setShow(!show)}>show</button>
            {show ? <OneMatch countryObject={countryObject} /> : ''}
        </div>
    )
}


export default ShowButton;