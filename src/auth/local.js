import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { User } from "../models/users.js"

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id)
    done(null, user)
})

passport.use('local-register', new LocalStrategy({
    
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true

    }, 
    async (req, username, password, done) => {
        const user = new User()
        user.username = username
        user.password = user.generateHash(password)
        await user.save()
        done(null, user)
    }
))

export default passport


