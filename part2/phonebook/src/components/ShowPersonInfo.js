import React from 'react'
import DeletePerson from './DeletePerson'

const ShowPersonInfo = ({ persons, searchName, setPersons, setErrMsg }) => {

    const filteredPersons = persons
        .filter(person => person.name.toLowerCase()
            .includes(searchName.toLowerCase()))

    return (
        <div>
            {filteredPersons.map(person =>
                <ShowOnePerson key={person.id}
                    person={person}
                    persons={persons}
                    setPersons={setPersons}
                    setErrMsg={setErrMsg}
                />)}
        </div>
    )
}

const ShowOnePerson = ({ person, persons, setPersons, setErrMsg }) => {
    return (
        <div>
            {person.name} {person.number} <DeletePerson person={person} persons={persons} setPersons={setPersons} setErrMsg={setErrMsg} />
        </div>
    )
}

export default ShowPersonInfo 