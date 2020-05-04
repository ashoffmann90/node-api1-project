const express = require("express")
const shortid = require('shortid')
// console.log(shortid.generate())

const server = express()

server.use(express.json())

let users = [
    {
        id: shortid(),
        name: 'Jimmy Dimmy Doe',
        bio: 'Some random dude!'
    },
    {
        id: shortid(),
        name: "The LT",
        bio: "ACNW."
    },
    {
        id: shortid(),
        name: "The CW",
        bio: "Tennis."
    }
]

server.get('/', (req, res) => {
    res.json({api: 'Up and Running!'})
})

server.get('/api/users', (req, res) => {
    res.json(users)
})

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id
    const userById = users.filter(user => user.id == id)
    res.status(200).json(userById)
})

server.post('/api/users', (req, res) => {
    const userInfo = req.body
    if (res) {
        if(userInfo.name && userInfo.bio){
            if (typeof userInfo.name !== 'string' || typeof userInfo.bio !== 'string') {
                res.status(400).json({errorMessage: 'Must provide name and bio.'})
            } else {
                users.push(userInfo)
                res.status(201).json(userInfo)
            }
        } else {
            res.status(400).json({
                errorMessage: 'Must provide name and bio.'
            })
        }
    } else {
        res.status(500).json({
            errorMessage: 'Error while saving user to database.'
        })
    }
})

server.patch('/api/users/:id', (req, res) => {
    const id = req.params.id
    const userById = users.filter(user => user.id == id)
    const userInfo = req.body

    if(!userInfo.name || !userInfo.bio) {
        res.status(400).json({errorMessage: 'Must provide Name and Bio.'})
    } else {
        res.status(200).json(userInfo)
    }
    res.status(202).json(userById)
    res.json(users.push(userInfo))
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    const userById = users.filter(user => user.id != id)
    res.status(202).json(userById)
})

server.listen(4000, () => console.log('\n== API is up ==\n'))