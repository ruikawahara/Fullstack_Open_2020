import React from 'react'

const PersonForm = ({ handleClick,
    newName, handleFormText,
    newNumber, handleFormNumber }) => {
    return (

        <form onSubmit={handleClick}>

            <div>
                <div>
                    name: <input
                        type="text"
                        placeholder="Your Name"
                        value={newName}
                        onChange={handleFormText}
                        required
                    />
                </div>

                <div>
                    number: <input
                        type="tel"
                        pattern="[0-9\-]+"
                        placeholder="Phone Number"
                        value={newNumber}
                        onChange={handleFormNumber}
                        required
                    />
                </div>

            </div>
            <div>

                <button type="submit">add</button>
            </div>
        </form>

    )
}

export default PersonForm