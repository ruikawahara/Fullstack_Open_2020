import React from 'react'
import servicePerson from '../service/persons'

const DeletePerson = ({ person, persons, setPersons, setErrMsg }) => {
    const removePerson = e => {
        e.preventDefault()

        const gotRemoved = window.confirm(`Delete ${person.name}?`)
        if (gotRemoved) {
            servicePerson
                .deletePerson(person.id)
                .then(setPersons(persons.filter(n => n.id !== person.id)))
                .catch(err => {
                    setErrMsg(
                        `Information of ${person.name} has already been removed from server`
                    )
                    setTimeout(() => {
                        setErrMsg(null)
                    }, 5000)

                    setPersons(persons.filter(n => n.id !== person.id))
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