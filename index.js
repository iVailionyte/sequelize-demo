// Entire API fits in this basic express.js boilerplate
// POST /API/users // create user
// GET /API/users // get all users

// POST /API/blogs // create a blog post

// GET /API/blogs/:userId? // get all blogs | get blogs of one user
// GET /API/blogs/:tag/tag // get all blogs by a tag
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

// API endpoints
const port = 3000
app.listen(port, () => {
    console.log(`Running on http://localhost:`${port})
})

// Importing models
// dependencies
const { User, Blog, Tag } = require('./sequelize')

//create a user
//User is a reference to a model object that was imported
// create method accepts an argument (an object) containing properties that are in the models and their values
// e.g. req.body will be { name: "Name Surname" }
// Sequelize will map properties to columns, make an SQL statement, open a connection to the database, and execute that statement. 
// After it will return a Promise to which it will pass a user model
app.post('/api/users', (req, res) => {
    User.create(req.body)
        .then(user => res.json(user))
})

// get all users
app.get('/api/users', (req, res) => {
    User.findAll().then(users => res.json(users))
})

