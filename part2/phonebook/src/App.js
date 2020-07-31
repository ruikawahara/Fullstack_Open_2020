import React, { useState } from 'react';
import ShowPersonInfo from './components/ShowPersonInfo'

const App = () => {

  // states
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas', number: '040-123456'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


  // functions 
  const handleFormText = (e) => setNewName(e.target.value)
  const handleFormNumber = (e) => setNewNumber(e.target.value)

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
      <form onSubmit={handleClick}> {/* Moved handleClick here so input validation works */}

        <div>
          <div>
            name: <input
              type="text"
              value={newName}
              onChange={handleFormText}
              required
            />
          </div>

          <div>
            number: <input
              type="tel"
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
      <ShowPersonInfo persons={persons} />

    </div>
  )
}

export default App;
