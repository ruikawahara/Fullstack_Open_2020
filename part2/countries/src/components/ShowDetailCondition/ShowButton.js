import React, { useState } from 'react'
import OneMatch from './OneMatch';

/**
 * Note: Some specific countries 
 * (e.g. Swaziland, France, Central Africa, etc.)
 * does not format correctly. 
 * 
 * Info itself shows up perfectly fine (i.e. meets spec),
 * but formatting is off for some countries. 
 */

const ShowButton = ({ countryObject }) => {
    const [show, setShow] = useState(false)

    return (
        <div style={{ display: 'inline-block' }}>
            <button onClick={() => setShow(!show)}>{show ? `Hide` : `Show`}</button>
            {show ? <OneMatch countryObject={countryObject} /> : ''}
        </div>
    )
}


export default ShowButton;