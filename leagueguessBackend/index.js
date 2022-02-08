const express = require('express')
const app = express()
const cors = require('cors')
const Score = require('./models/score')
require('dotenv').config()

app.use(cors())
app.use(express.json())

let highscores = [

]

const generateId = () => {
    const maxId = highscores.length > 0
        ? Math.max(...highscores.map(n => n.id))
        : 0
    return maxId + 1
}

app.get('/api/highscores', (request, response) => {
    Score.find({}).then(scores => {
        console.log(scores)
        response.json(scores)
    })

})

app.post('/api/highscores', (request, response) => {
    const body = request.body
    console.log(request.body)
    if (!body.name) {
        return response.status(400).json({
            error: 'content missing'
        })
    }

    const score = new Score({
        name: body.name,
        points: body.points || 0,
        id: generateId(),
    })

    score.save().then(result => {
        console.log('score saved')
    })
    highscores = highscores.concat(score)

    response.json(score)
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})