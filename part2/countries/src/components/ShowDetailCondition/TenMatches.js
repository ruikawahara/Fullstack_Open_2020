/**
 * This file contains each case for 'ShowDetail.js'
 * So it would have less code on the other file
 */
import React from 'react';
import ShowButton from './ShowButton';

const DisplayMatchName = ({ country }) => {
    return (
        <div>
            {country.name}
            <ShowButton countryObject={country} />
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
                        country={country}
                    />)}
        </div>
    )
}

export default TenMatches;