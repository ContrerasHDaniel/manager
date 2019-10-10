const express = require('express');
const router = express.Router();
const Inventario = require('../models/Inventario');

router.get('/inventario/laboratorio', async (req, res) => {
    const inventarioLab = await Inventario.find({type: "lab"}).exec(function (err, inventarioLab){
        if (err) {
            console.log(err);
            res.sendStatus(400);
        } else {
            res.render('contents/laboratorio', {inventarioLab});
        }
    });
});

router.post('/inventario/laboratorio', async (req, res) => {
    var {id, descr, type, brand, model, series, uaz, guard, location, details, funding} = req.body;
    
    try{
        const equipoLab = await EquipoLab.findByIdAndUpdate(id, 
            {
                $set: {
                    description: descr,
                    type: type,
                    brand: brand,
                    model: model,
                    serial: series,
                    uaz: uaz,
                    guard: guard,
                    location: location,
                    details: details,
                    funding: funding
                }
            });
            res.sendStatus(200);
    } catch {
        res.sendStatus(500);
    }
});

module.exports = router;