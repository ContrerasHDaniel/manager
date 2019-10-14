const express = require('express');
const router = express.Router();
const { check, validationResult } =  require('express-validator');
const User = require('../models/Usuario');
const passport = require('passport');
const { isAuthenticated } = require('../helpers/auth');

router.get('/inventario/users/signin', (req, res) =>{
    res.render('users/login');
});

router.post('/inventario/users/signin', passport.authenticate('local',{
    successRedirect: '/inventario',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/inventario/users/signup', isAuthenticated, (req, res) => {
    res.render('users/signup');
});

router.post('inventario/users/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({name, email, password});
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    res.sendStatus(200);
});

router.get('inventario/users/logout', isAuthenticated, (req, res) => {
    req.logOut();
    res.redirect('/inventario/users/signin');
});

module.exports = router;