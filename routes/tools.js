const express = require('express');
const router = express.Router();
const { check, validationResult } =  require('express-validator');
const Inventario = require('../models/Inventario');
const { isAuthenticated } = require('../helpers/auth');

router.get('/inventario/tools', isAuthenticated, async (req, res) => {
    const inventarioTools = await Inventario.find({type: "tools"}).exec(function (err, inventarioTools) {
        if (err) {
            res.render('contents/tools');
        } else {
            res.render('contents/tools', {inventarioTools});
        }
    });
});

module.exports = router;