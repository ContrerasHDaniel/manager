const express = require('express');
const router = express.Router();
const { check, validationResult } =  require('express-validator');
const Inventario = require('../models/Inventario');

router.get('/inventario/calefaccion', async (req, res) => {
    const inventarioCalefaccion = await Inventario.find({type: "cal"}).exec(function (err, inventarioCalefaccion) {
        if (err) {
            res.render('contents/calefaccion');
        } else {
            res.render('contents/calefaccion', {inventarioCalefaccion});
        }
    });
});

module.exports = router;