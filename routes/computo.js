const express = require('express');
const router = express.Router();
const { check, validationResult } =  require('express-validator');
const { isAuthenticated } = require('../helpers/auth');
const Inventario = require('../models/Inventario');

router.get('/inventario/computo', isAuthenticated, async (req, res) => {
    const inventarioComp = await Inventario.find({type: "comp"}).exec(function (err, inventarioComp) {
        if (err) {
            res.render('contents/computo');
        } else {
            res.render('contents/computo', {inventarioComp});
        }
    });
});

module.exports = router;