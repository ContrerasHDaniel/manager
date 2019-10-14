const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Tarjetas = require('../models/Tarjetas');
const { isAuthenticated } = require('../helpers/auth');

router.get('/inventario/tarjetas', isAuthenticated, async (req, res) => {
    const tarjetas = await Tarjetas.find().exec(function(err, tarjetas){
        if (err) {
            console.log(err);
            res.render('contents/tarjetas');
        } else {
            res.render('contents/tarjetas', {tarjetas});
        }
    });
});

router.put('/inventario/tarjetas/edit/:id', isAuthenticated, async (req, res) => {
    var { descr, brand, model, series, uaz} = req.body;
    
    try{
        const tarjetas = await Tarjetas.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    description: descr,
                    brand: brand,
                    model: model,
                    series: series,
                    uaz: uaz
                }
            });
        res.sendStatus(200);
    } catch(err){
        res.sendStatus(500);
    }
});

module.exports = router;