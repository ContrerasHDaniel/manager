const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/Usuario');

passport.use(new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    // Autentificación
    // Busca el usuario en la db
    const user = await User.findOne({email: email});
    if (!user) {
        // error nulo, false (no existe el usuario), mensaje
        return done(null, false, {message: 'No user found'});
    } else {
        // Si hay usuario, se valida la contraseña insertada
        const match = await user.matchPassword(password);
        // Si coincide
        if (match) {
            // error nulo, usuario encontrado
            return done(null, user);
        } else {
            // error nulo, no usuario (contraseña incorrecta), mensaje
            return done(null, false, {message: 'Incorrect password'});
        }
    }
}
));

passport.serializeUser((user, done) => {
    // error, almacenar el id de usuario
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // toma id de la sesión para obtener los datos del usuario
    User.findById(id, (err, user) => {
        // error, usuario encontrado
        done(err, user);
    });
});