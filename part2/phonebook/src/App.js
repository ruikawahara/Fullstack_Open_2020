import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import ShowPersonInfo from './components/ShowPersonInfo'
import servicePerson from './service/persons'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  // GET request
  const getDataHook = () => {
    servicePerson
      .getAll()
      .then(initPersons => setPersons(initPersons))
  }

  useEffect(getDataHook, [])

  // functions 
  const handleFormText = (e) => setNewName(e.target.value)
  const handleFormNumber = (e) => setNewNumber(e.target.value)
  const handleSearch = (e) => setSearchName(e.target.value)

  const handleClick = (e) => {
    e.preventDefault()

    // no longer case sensitive 
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase()))
      window.alert(`${newName} is already added to phonebook`)
    else {
      // POST request
      const newNoteObj = { name: newName, number: newNumber }
      servicePerson.create(newNoteObj).then(returnedPerson =>
        setPersons(persons.concat(returnedPerson))
      )
    }

    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchName={searchName} handleSearch={handleSearch} />

      <h3>Add a new</h3>
      <PersonForm handleClick={handleClick}
        newName={newName} handleFormText={handleFormText}
        newNumber={newNumber} handleFormNumber={handleFormNumber}
      />

      <h3>Numbers</h3>
      <ShowPersonInfo persons={persons} searchName={searchName} />

    </div>
  )
}

export default App;
