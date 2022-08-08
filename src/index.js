// write a simple express server
import express from 'express'
import morgan from 'morgan'
import mongoose from 'mongoose'
import passport from 'passport'
import session from 'express-session'
import flash from 'connect-flash'

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

app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
    app.locals.registerMessage = req.flash("registerMessage")
    app.locals.loginMessage = req.flash("loginMessage")
    next()
})

app.use('/', v1Routes)

mongoose.connect('mongodb+srv://roberto12:hola2022@cluster0.tl6fgmm.mongodb.net/bolsa_de_gatos?retryWrites=true&w=majority', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB')
    }).catch(err => {
        console.log("Hubo un error!")
    })

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
