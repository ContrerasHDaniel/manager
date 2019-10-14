const express = require('express');
const router = express.Router();
const { check, validationResult } =  require('express-validator');
const Inventario = require('../models/Inventario');
const { isAuthenticated } = require('../helpers/auth');

router.get('/inventario/oficina', isAuthenticated, async (req, res) => {
    const inventarioOficina = await Inventario.find({type: "ofc"}).exec(function (err, inventarioOficina) {
        if (err) {
            res.sendStatus(500);
        } else {
            res.render('contents/oficina', {inventarioOficina});
        }
    });
});

module.exports = router;