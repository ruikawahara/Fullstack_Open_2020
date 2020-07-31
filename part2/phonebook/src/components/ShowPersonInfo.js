import React from 'react'

const ShowPersonInfo = ({ persons }) => {

    return (
        <div>
            {persons.map(person =>
                <div
                    key={person.name}>
                    {person.name}
                </div>)}
        </div>
    )
}

export default ShowPersonInfo 