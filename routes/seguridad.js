const express = require('express');
const router = express.Router();
const { check, validationResult } =  require('express-validator');
const Inventario = require('../models/Inventario');

router.get('/inventario/seguridad', async (req, res) => {
    const inventarioSeguridad = await Inventario.find({type: "sec"}).exec(function (err, inventarioSeguridad) {
        if (err) {
            res.render('contents/seguridad');
        } else {
            res.render('contents/seguridad', {inventarioSeguridad});
        }
    });
});

module.exports = router;