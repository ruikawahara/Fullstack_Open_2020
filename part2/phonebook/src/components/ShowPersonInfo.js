import React from 'react'

const ShowPersonInfo = ({ persons, searchName }) => {

    const filteredPersons = persons
        .filter(person => person.name.toLowerCase()
            .includes(searchName.toLowerCase()))

    return (
        <div>
            {filteredPersons.map(person =>
                <ShowOnePerson key={person.name}
                    name={person.name}
                    number={person.number}
                />)}
        </div>
    )
}

const ShowOnePerson = ({ name, number }) => <div>{name} {number}</div>

export default ShowPersonInfo 