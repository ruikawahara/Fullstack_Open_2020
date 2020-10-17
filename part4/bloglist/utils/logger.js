const info = (...params) => {
    if (process.env.NODE_ENV !== 'test')
        console.log(...params)
}

const error = (...params) => {
    // // uncomment below for multi "failure" tests
    // if (process.env.NODE_ENV !== 'test')
    console.error(...params)
}

module.exports = { info, error }