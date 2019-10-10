const express = require('express');
const router = express.Router();
const { check, validationResult } =  require('express-validator');
const Inventario = require('../models/Inventario');

router.get('/inventario/redes', async (req, res) => {
    const inventarioRedes = await Inventario.find({type: "net"}).exec(function (err, inventarioRedes) {
        if (err) {
            res.render('contents/redes');
        } else {
            res.render('contents/redes', {inventarioRedes});
        }
    });
});

module.exports = router;