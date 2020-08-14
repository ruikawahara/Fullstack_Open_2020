import React from 'react'
import servicePerson from '../service/persons'

const DeletePerson = ({ person, persons, setPersons }) => {
    const removePerson = e => {
        e.preventDefault()

        const gotRemoved = window.confirm(`Delete ${person.name}?`)
        if (gotRemoved) {
            servicePerson
                .deletePerson(person.id)
                .then(setPersons(persons.filter(n => n.id !== person.id)))
                .catch(err => {
                    alert("That person is not in our database")
                    console.log(err)
                })
        }
    }

    return (
        <form onSubmit={removePerson}
            style={{ display: 'inline-block' }}>
            <button type="submit">Delete</button>
        </form>
    )
}

export default DeletePerson;