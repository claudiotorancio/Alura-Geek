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



passport.use('local.update', new LocalStrategy({
    usernameField: 'newUsername', // Campo para el nuevo nombre de usuario
    passwordField: 'newPassword', // Campo para la nueva contraseña
    passReqToCallback: true
}, async (req, newUsername, newPassword, done) => {
    try {
      
        // Actualizar el nombre de usuario y la contraseña del usuario específico
        const userToUpdate = await Users.findById(req.body.userId); // Obtener el ID del usuario del cuerpo de la solicitud
        if (!userToUpdate) {
            return done(null, false, { message: 'Usuario no encontrado' });
        }

        // Actualizar los valores del usuario
        userToUpdate.username = newUsername;
        userToUpdate.password = await helpers.encryptPassword(newPassword);
        await userToUpdate.save();

        // Devolver el usuario actualizado
        return done(null, userToUpdate);
    } catch (err) {
        return done(err, false, { message: 'Error al actualizar el usuario' });
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