import React from 'react'

const Filter = ({ countryName, searchName }) => {
    return (
        <div>
            Find countries <input
                type="text"
                value={countryName}
                onChange={searchName}
                placeholder="Enter country name"
            />
        </div>
    )
}

export default Filter;