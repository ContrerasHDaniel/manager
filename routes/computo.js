const express = require('express');
const router = express.Router();
const { check, validationResult } =  require('express-validator');
const Inventario = require('../models/Inventario');

router.get('/inventario/computo', async (req, res) => {
    const inventarioComp = await Inventario.find({type: "comp"}).exec(function (err, inventarioComp) {
        if (err) {
            res.render('contents/computo');
        } else {
            res.render('contents/computo', {inventarioComp});
        }
    });
});

// Ruta para actualizar
router.put('/inventario/computo/edit/:id', async (req, res) => {
    var {descr, type, brand, model, serial, uaz, guard, location, details, funding, rfid} = req.body;
    
    // Se obtiene el código del tipo antes de almacenarlo en la DB
    var typo = types.get(type.normalize('NFD').replace(/[\u0301]/g,'').toLowerCase());
    try{
        const inventarioComputo = await Inventario.findByIdAndUpdate(req.params.id, 
            {
                $set: {
                    description: descr,
                    type: typo,
                    brand: brand,
                    model: model,
                    series: serial,
                    uaz: uaz,
                    guard: guard,
                    location: location,
                    details: details,
                    funding: funding,
                    rfid: rfid
                }
            });
            res.sendStatus(200);
    } catch {
        res.sendStatus(500);
    }
});

module.exports = router;