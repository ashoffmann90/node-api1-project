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
    
    if(res) {
        if(id === undefined){
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
            res.status(200).json(userById)
        }
    } else {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
})

server.post('/api/users', (req, res) => {
    const userInfo = req.body

    if (res){
        if(!userInfo.name || !userInfo.bio){
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        } else {
            users.push(userInfo)
            res.status(201).json(userInfo)
        }
    } else {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }
})

server.patch('/api/users/:id', (req, res) => {
    const id = req.params.id
    const getUser = users.filter(user => user.id == id)
    const userInfo = req.body
    let newUsers

    if(res){
        if (id === undefined){
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else if (!userInfo.name || !userInfo.bio) {
            res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
        } else {
            users.push(newUsers)
            res.status(200).json(userInfo)
        }
    } else {
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    }
})

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    const userById = users.filter(user => user.id != id)
    res.status(202).json(userById)
})

server.listen(4000, () => console.log('\n== API is up ==\n'))