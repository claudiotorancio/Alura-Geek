import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import mongoose from "mongoose";
import helpers from './helpers.js';
import MONGODB_URI from '../config.js';
import Users from '../models/User.js';

//connect to database

await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});


// SignIn
passport.use('local.signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {
 
    try {
        const user = await Users.findOne({ username: username });
        
        if (user) {
            const validPassword = await helpers.matchPassword(password, user.password);

            if (validPassword) {
           
 
                    return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password' });
            }
        } else {
            return done(null, false, { message: 'The username does not exist' });
        }
    
    } catch (err) {
        return done(err, false, { message: 'An error occurred' }); 
    }
    
}));


//SignUp

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, username, password, done) => {

    try {
        const existingUser = await Users.findOne({ username });
        if (existingUser) {
            return done(null, false, { message: 'Username already taken' });
        }
        const newUser = new Users({
            username: username,
            password: await helpers.encryptPassword(password),
        });
       await newUser.save();
        
        return done(null, newUser);
    } catch (err) {
        return done(err, false, { message: 'Error creating user' });
    }
}));



//serialUser

passport.serializeUser((user, done) => {

    done(null, user.id);
});
  
passport.deserializeUser(async (id, done) => {
    try {
        const user = await Users.findById(id);

        done(null, user);
        
    } catch (err) {
        done(err, null);
    }
});


export default passport