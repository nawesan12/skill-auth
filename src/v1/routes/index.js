import express from "express"
import passport from "passport"

const router = express.Router()

router
    .get("/auth/login", (req, res, next) => {
        res.send("Login page")
    })
    .post("/auth/login", (req, res, next) => {
        const { username, password } = req.body

        res.send("Hello World")
    })

    .get("/auth/register", (req, res, next) => {
        res.send("Register page")
    })
    .post("/auth/register", passport.authenticate("local-register", {
        successRedirect: "/",
        failureRedirect: "/auth/register",
        passReqToCallback: true
    }))

export default router