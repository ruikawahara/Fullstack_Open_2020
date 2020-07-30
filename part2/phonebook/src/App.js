import React, { useState } from 'react';

const App = () => {

  // states
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')


  // functions
  const handleFormText = (e) => setNewName(e.target.value)


  const handleClick = (e) => {
    e.preventDefault()
    setPersons(persons.concat({ name: newName }))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          <div>debug: {newName}</div>

          name: <input
            type="text"
            value={newName}
            onChange={handleFormText}
          />

        </div>
        <div>
          <button type="submit" onClick={handleClick}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>

    </div>
  )
}

export default App;
