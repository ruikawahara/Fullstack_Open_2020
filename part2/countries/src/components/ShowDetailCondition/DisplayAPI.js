import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DisplayAPI = ({ capital }) => {
    const [metricInfo, setMetricInfo] = useState([])

    // from API
    const api_key = process.env.REACT_APP_API_KEY
    const metricInfoAPI = `http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`

    // let mounted to prevent unmount error
    // source: https://www.debuggr.io/react-update-unmounted-component/
    const metricHook = () => {
        let mounted = true;

        axios
            .get(metricInfoAPI)
            .then(res => {
                if (mounted)
                    setMetricInfo(res.data.current)
            })

        return () => mounted = false
    }

    useEffect(metricHook, [])

    if (metricInfo !== undefined) {
        const mph = Math.round(parseInt(metricInfo.wind_speed) * 0.621371)

        return (
            <div>
                <h3>Weather in {capital}</h3>

                <div><strong>Temperature: </strong> {metricInfo.temperature} Celcius</div>

                <div>
                    <img
                        src={metricInfo.weather_icons}
                        alt={`Temperature panel`}
                    />
                </div>

                <div><strong>Wind: </strong>{mph} mph direction {metricInfo.wind_dir}</div>
            </div>
        )
    }

    // error check
    return (
        <div>
            API did not run properly. Please check for spelling error.
        </div>
    )

}

export default DisplayAPI;