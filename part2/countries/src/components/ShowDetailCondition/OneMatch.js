/**
 * This file contains each case for 'ShowDetail.js'
 * So it would have less code on the other file
 */

import React, { useState, useEffect } from 'react';
import "./OneMatch.css";
import axios from 'axios';

const OneMatch = ({ countryObject }) => {
    const [metricInfo, setMetricInfo] = useState([])

    // from API
    const api_key = process.env.REACT_APP_API_KEY
    const metricInfoAPI = `http://api.weatherstack.com/current?access_key=${api_key}&query=${countryObject.capital}`

    const metricHook = () => {
        axios
            .get(metricInfoAPI)
            .then(res => setMetricInfo(res.data.current))
    }

    useEffect(metricHook, [])

    const mph = Math
        .round(parseInt(metricInfo.wind_speed) * 0.621371)

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

            <div>
                <h3>Weather in {countryObject.capital}</h3>

                <div>
                    <img
                        src={metricInfo.weather_icons}
                        alt={`Temperature panel`}
                    />
                </div>

                <div><strong>Temperature: </strong> {metricInfo.temperature} Celcius</div>

                <div><strong>Wind: </strong>{mph} mph direction {metricInfo.wind_dir}</div>
            </div>
        </div>
    )
}

export default OneMatch;