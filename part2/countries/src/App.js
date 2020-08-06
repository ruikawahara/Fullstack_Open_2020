import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'
import ShowDetail from './components/ShowDetail';
import axios from "axios";

const App = () => {
  // filter/search state
  const [countryName, setCountryName] = useState("")
  // country info state
  const [countryInfo, setCountryInfo] = useState([])

  const searchName = (event) => setCountryName(event.target.value)

  // fetch info from API and store in state
  const countryInfoHook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountryInfo(response.data))
  }

  useEffect(countryInfoHook, [])

  return (
    <div>
      <Filter countryName={countryName}
        searchName={searchName} />

      <ShowDetail countryName={countryName}
        countryInfo={countryInfo} />
    </div>
  )
}

export default App;