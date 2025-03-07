require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')
const cors = require('cors')

//express app
const app = express()

//middleware
app.use(cors({
    origin: ['https://work0ut-buddy-frontend-dinithi.netlify.app'],
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    credentials: true
}))
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/workouts', workoutRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
 .then(() => {
    //listen for requests
    app.listen(process.env.PORT, () => {
        console.log('connected to db & listening on port', process.env.PORT)
    })
 })
 .catch((error) => {
    console.log(error)
 })



