// write a simple express server
import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import passport from 'passport'
import session from 'express-session'

import "./auth/local.js"

import v1Routes from './v1/routes/index.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(morgan("dev"))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

app.use('/api/v1', v1Routes)

mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB')
    }).catch(err => {
        console.log("Hubo un error!")
    })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
