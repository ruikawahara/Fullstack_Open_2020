import React from 'react'
import DeletePerson from './DeletePerson'

const ShowPersonInfo = ({ persons, searchName }) => {

    const filteredPersons = persons
        .filter(person => person.name.toLowerCase()
            .includes(searchName.toLowerCase()))

    return (
        <div>
            {filteredPersons.map(person =>
                <ShowOnePerson key={person.id}
                    person={person}
                />)}
        </div>
    )
}

const ShowOnePerson = ({ person }) => {
    return (
        <div>
            {person.name} {person.number} <DeletePerson person={person} />
        </div>
    )
}

export default ShowPersonInfo 