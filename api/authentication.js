import { Router } from "express";
import login from "../backend/routes/user/login.js";
import success from "../backend/routes/user/success.js";

import passport from "../backend/lib/passport.js";
import { isLoggedIn, isNotLoggedIn } from "../backend/lib/auth.js";


const router = Router()


router.post('/api/signin', login)
router.get('/success', success)

/*router.post('/api/signin', (req,res, next) => {
    passport.authenticate('local.signin', {
     successRedirect: '/profile',
     failureRedirect: '/signin',
     failureFlash: true
    })(req,res, next);
 })

router.get('/profile', (req, res) => {
   
    res.render('profile');
});

/*router.post('/signin',  (req, res, next) => {
    passport.authenticate('local.signin', function (err, user, info) {
        if (err) {
            return next(err);
        }
        if (!user) {
            // Handle authentication failure, e.g., redirect to login page
            return res.redirect('/login');
        }
        // If authentication is successful, you can handle it as needed
        // For example, you might want to set the user in the session
        req.logIn(user, function (err) {
            if (err) {
                return next(err);
            }
            // Redirect to the desired page upon successful login
            return res.redirect('/index');
        });
    })(req, res, next);
});*/


export default router