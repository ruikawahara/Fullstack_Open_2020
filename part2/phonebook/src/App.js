import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import ShowPersonInfo from './components/ShowPersonInfo'
import axios from 'axios';

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  // get info with axios
  const getDataHook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(res => setPersons(res.data))
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
    else
      setPersons(persons.concat({ name: newName, number: newNumber }))

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
