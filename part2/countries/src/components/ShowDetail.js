import React from 'react';
import OneMatch from './ShowDetailCondition/OneMatch';
import TenMatches from './ShowDetailCondition/TenMatches';

const ShowDetail = ({ countryName, countryInfo }) => {

    const matchName =
        (name, nameSubStr) => name.toLowerCase()
            .includes(nameSubStr.toLowerCase())

    const filteredCountry = countryInfo
        .filter(country => matchName(country.name, countryName))

    /**
     * Conditions:
     * 1) Default - No show
     * 2) 1 < N <= 10 - show list of names
     * 3) N == 1 - show detail
     * 4) N > 10 - Display "Too many matches"
     * 5) N == 0 - Display "No Match"
     */

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
            return (
                <OneMatch filteredCountry={filteredCountry} />
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