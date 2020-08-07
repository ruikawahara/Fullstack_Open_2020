/**
 * This file contains each case for 'ShowDetail.js'
 * So it would have less code on the other file
 */

import React from 'react'
import "./OneMatch.css";

const OneMatch = ({ filteredCountry }) => {
    // guaranteed to have one element, so use idx 0
    const countryObject = filteredCountry[0]

    return (
        <div>
            <h2>{countryObject.name}</h2>

            <div>
                <div>capital {countryObject.capital}</div>
                <div>population {countryObject.population}</div>
            </div>

            <div>
                <h3>Languages</h3>
                <ul>
                    {countryObject
                        .languages.map(lang =>
                            <li key={lang.name}>
                                {lang.name}
                            </li>)
                    }
                </ul>

            </div>

            <div>
                <img
                    className="flag-photo"
                    src={countryObject.flag}
                    alt={`flag of ${countryObject.name}`}
                />
            </div>
        </div>
    )
}

export default OneMatch;