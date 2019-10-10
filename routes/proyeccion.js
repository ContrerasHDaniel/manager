const express = require('express');
const router = express.Router();
const { check, validationResult } =  require('express-validator');
const Inventario = require('../models/Inventario');

router.get('/inventario/proyeccion', async (req, res) => {
    const inventarioProyeccion = await Inventario.find({type: "pry"}).exec(function (err, inventarioProyeccion) {
        if (err) {
            res.render('contents/proyeccion');
        } else {
            res.render('contents/proyeccion', {inventarioProyeccion});
        }
    });
});

module.exports = router;