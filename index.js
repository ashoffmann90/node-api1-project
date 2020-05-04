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

// server.patch('/api/users/:id', (req, res) => {
//     const id = req.params.id
//     // const userById = users.filter(user => user.id == id)
//     const userInfo = req.body

//     if(!userInfo.name || !userInfo.bio) {
//         res
//         .status(400)
//         .json({ errorMessage: "Please provide name and bio for the user." })
//     } else {
//         .then(user => {
//             if (user) {
//                 res
//                 .status(200)
//                 .json(user)
//             } else {
//                 res
//                 .status(404)
//                 .json({ message: "The user with the specified ID does not exist." })
//             }
//         })
//         .catch(() => {
//             res
//             .status(500)
//             .json({ errorMessage: "The user information could not be modified." })
//         })
//     }
// })

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id
    const userById = users.filter(user => user.id != id)
    res.status(202).json(userById)
})

server.listen(4000, () => console.log('\n== API is up ==\n'))