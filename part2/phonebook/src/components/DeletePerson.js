import React from 'react'

const DeletePerson = ({ person }) => {
    const removePerson = (e) => {
        e.preventDefault()

        const gotRemoved = window.confirm(`Delete ${person.name}?`)
        if (gotRemoved)
            console.log(`Removed ${person.name}`)
        else
            console.log(`${person.name} stays`)
    }

    return (
        <form onSubmit={removePerson}
            style={{ display: 'inline-block' }}>
            <button type="submit">Delete</button>
        </form>
    )
}

export default DeletePerson;