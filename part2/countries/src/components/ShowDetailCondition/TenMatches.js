/**
 * This file contains each case for 'ShowDetail.js'
 * So it would have less code on the other file
 */
import React from 'react';

const DisplayMatchName = ({ country }) => {
    return (
        <div>
            {country}
        </div>
    )
}

const TenMatches = ({ filteredCountry }) => {
    return (
        <div>
            {filteredCountry
                .map(country =>
                    <DisplayMatchName
                        key={country.numericCode}
                        country={country.name}
                    />)}
        </div>
    )
}

export default TenMatches;