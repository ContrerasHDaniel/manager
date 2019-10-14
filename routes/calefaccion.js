const express = require('express');
const router = express.Router();
const { check, validationResult } =  require('express-validator');
const Inventario = require('../models/Inventario');
const { isAuthenticated } = require('../helpers/auth');

router.get('/inventario/calefaccion', isAuthenticated, async (req, res) => {
    const inventarioCalefaccion = await Inventario.find({type: "cal"}).exec(function (err, inventarioCalefaccion) {
        if (err) {
            res.render('contents/calefaccion');
        } else {
            res.render('contents/calefaccion', {inventarioCalefaccion});
        }
    });
});

module.exports = router;