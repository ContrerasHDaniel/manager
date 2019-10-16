const express = require('express');
const router = express.Router();
const { check, validationResult } =  require('express-validator');
const User = require('../models/Usuario');
const passport = require('passport');
const { isAuthenticated } = require('../helpers/auth');

router.get('/users/signin', (req, res) =>{
    res.render('users/login');
});

router.post('/users/signin', passport.authenticate('local',{
    successRedirect: '/inventario',
    failureRedirect: '/users/signin',
    failureFlash: true
}));

router.get('/admin/signup', (req, res) => {
    res.render('users/signup');
});

router.post('/admin/signup', async (req, res) => {
    const { name, email, password } = req.body;
    const newUser = new User({name, email, password});
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    res.sendStatus(200);
});

router.get('/users/logout', isAuthenticated, (req, res) => {
    req.logOut();
    res.redirect('/inventario/users/signin');
});

module.exports = router;