const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/users')

module.exports = userRouter