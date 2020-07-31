import React, { useState } from 'react';
import ShowPersonInfo from './components/ShowPersonInfo'

const App = () => {

  // states... persons filled with dummy data
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')


  // functions 
  const handleFormText = (e) => setNewName(e.target.value)
  const handleFormNumber = (e) => setNewNumber(e.target.value)
  const handleSearch = (e) => setSearchName(e.target.value)

  const handleClick = (e) => {
    e.preventDefault()

    // no longer case sensitive 
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase()))
      window.alert(`${newName} is already added to phonebook`)
    else
      setPersons(persons.concat({ name: newName, number: newNumber }))

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input
          type="text"
          placeholder="search"
          value={searchName}
          onChange={handleSearch}
        />
      </div>

      <h2>add a new</h2>
      <form onSubmit={handleClick}> {/* Moved handleClick here so input validation works */}

        <div>
          <div>
            name: <input
              type="text"
              placeholder="Your Name"
              value={newName}
              onChange={handleFormText}
              required
            />
          </div>

          <div>
            number: <input
              type="tel"
              pattern="[0-9\-]+"
              placeholder="Your Number"
              value={newNumber}
              onChange={handleFormNumber}
              required
            />
          </div>

        </div>
        <div>

          {/* previous code. Does not do validation with empty input field */}
          {/* <button type="submit" onClick={handleClick}>add</button> */}
          <button type="submit">add</button>
        </div>
      </form>

      <h2>Numbers</h2>
      <ShowPersonInfo persons={persons} searchName={searchName} />

    </div>
  )
}

export default App;
