const express = require('express')
const app = express()

let persons = [
    {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-43-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    },
]

// GET person
app.get('/api/persons', (req, res) => res.json(persons))

app.get('/api/persons/:id', (req, res) => {
    const person = persons.find(person => person.id === parseInt(req.params.id))

    if (person)
        res.json(person)
    else
        res.status(404)
            .send(`Person with ID of number ${req.params.id} not found`)
            .end()
})

// GET info
app.get('/info', (req, res) => {
    const personsCount = persons.length
    //app.use(express.responseTime())

    res.send(`
        <p>
            Phonebook has info for ${personsCount} people
        </p>
        <div>
            ${new Date()}
        </div>
    `)
})

// DELETE person
app.delete('/api/persons/:id', (req, res) => {
    persons = persons.filter(person => person.id !== parseInt(req.params.id))

    res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})