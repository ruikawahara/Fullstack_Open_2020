import React, { useState } from 'react';
import Filter from './components/Filter'

const App = () => {
  const [countryName, setCountryName] = useState("");

  const searchName = (event) => setCountryName(event.target.value)

  return (
    <div>
      <Filter countryName={countryName}
        searchName={searchName} />
      debug: {countryName}

    </div>
  )
}

export default App;