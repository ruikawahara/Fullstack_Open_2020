const info = (...params) => {
    if (process.env.NODE_ENV !== 'test')
        console.log(...params)
}

const error = (...params) => {
    // // remove if when necessary
    // if (process.env.NODE_ENV !== 'test')
    console.error(...params)
}

module.exports = { info, error }