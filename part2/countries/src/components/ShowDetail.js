import React from 'react';
import OneMatch from './ShowDetailCondition/OneMatch';
import TenMatches from './ShowDetailCondition/TenMatches';

const ShowDetail = ({ countryName, countryInfo }) => {

    const matchName =
        (name, nameSubStr) => name.toLowerCase()
            .includes(nameSubStr.toLowerCase())

    const filteredCountry = countryInfo
        .filter(country => matchName(country.name, countryName))

    if (countryName.length !== 0) {

        if (filteredCountry.length > 10) {
            return (
                <div>
                    Too many matches, specify another filter
                </div>
            )
        }

        else if (filteredCountry.length > 1) {
            return (
                <TenMatches filteredCountry={filteredCountry} />
            )
        }
        else if (filteredCountry.length === 1) {
            // guaranteed to have one element, so use idx 0
            return (
                <OneMatch countryObject={filteredCountry[0]} />
            )
        }

        return (
            <div>
                There are no match, try another filter
            </div>
        )
    }

    // Default - no country name was searched 
    return (<div></div>)
}

export default ShowDetail