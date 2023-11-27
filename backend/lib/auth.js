import passport from "passport"

passport.authenticate('session')

export const isLoggedIn = (req, res) => {
    if (req.isAuthenticated()) {
        return next()
    }

    console.log(req.isAuthenticated())
}
export const isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        return next()
    }

    console.log('require logueo')
}