import React, { useState, useEffect } from 'react';
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import ShowPersonInfo from './components/ShowPersonInfo'
import servicePerson from './service/persons'
import Notification from './components/Notification'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchName, setSearchName] = useState('')

  const [submitMsg, setSubmitMsg] = useState(null)
  const [errMsg, setErrMsg] = useState(null)

  // GET request
  const getDataHook = () => {
    servicePerson
      .getAll()
      .then(initPersons => setPersons(initPersons))
      .catch(err => {
        alert('Error: Cannot Display ALL Items')
        console.log(err)
      })
  }

  useEffect(getDataHook, [])

  // functions 
  const handleFormText = (e) => setNewName(e.target.value)
  const handleFormNumber = (e) => setNewNumber(e.target.value)
  const handleSearch = (e) => setSearchName(e.target.value)

  const handleClick = (e) => {
    e.preventDefault()

    // no longer case sensitive 
    if (persons.some(person => person.name.toLowerCase() === newName.toLowerCase())) {
      // PUT request
      const replaceNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with new one?`)

      if (replaceNumber) {
        const changeTarget = persons.find(person => person.name === newName)
        const changedPersons = { ...changeTarget, number: newNumber }

        servicePerson
          .update(changeTarget.id, changedPersons)
          .then(modifiedPerson => {
            setPersons(persons
              .map(person =>
                person.name !== newName ? person : modifiedPerson))
          })
          .catch(err => {
            alert(
              `person "${changeTarget.name}" may be a duplicate or does not exist`
            )
            console.log(err)
          })

      }
    }
    else {
      // POST request
      const newPersonObj = { name: newName, number: newNumber }
      servicePerson.create(newPersonObj)
        .then(returnedPerson =>
          setPersons(persons.concat(returnedPerson)),
          setSubmitMsg(`Added ${newName}`),
          setTimeout(() => {
            setSubmitMsg(null)
          }, 2000)
        )
        .catch(err => {
          alert(
            `person "${newPersonObj.name}" cannot be created`
          )

          console.log(err)
        })
    }

    setNewName('')
    setNewNumber('')
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification.Sucses msg={submitMsg} />
      <Notification.Err msg={errMsg} />
      <Filter searchName={searchName} handleSearch={handleSearch} />

      <h3>Add a new</h3>
      <PersonForm handleClick={handleClick}
        newName={newName} handleFormText={handleFormText}
        newNumber={newNumber} handleFormNumber={handleFormNumber}
      />

      <h3>Numbers</h3>
      <ShowPersonInfo persons={persons}
        searchName={searchName}
        setPersons={setPersons}
        setErrMsg={setErrMsg}
      />

    </div>
  )
}

export default App;
