import React from 'react';
import OneMatch from './ShowDetailCondition/OneMatch';
import TenMatches from './ShowDetailCondition/TenMatches';

const ShowDetail = ({ countryName, countryInfo }) => {
    countryInfo.map(country => console.log(country.name))

    // place holder: length of string for now
    if (countryName.length > 10) {
        return (
            <div>
                There are lots of character
            </div>
        )
    }
    else if (countryName.length > 1) {
        return (
            <TenMatches />
        )
    }
    else if (countryName.length === 1) {
        return (
            <OneMatch />
        )
    }

    return (
        <div>
            String is empty
        </div>
    )
}

export default ShowDetail