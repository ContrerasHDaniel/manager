const express = require('express');
const router = express.Router();
const Inventario = require('../models/Inventario');
const ObjectId = mongoose.Types.ObjectId;

router.get('/inventario', (req, res) => {
    res.render('index');
});

router.post('/inventario', async (req, res) => {
    var {descr, type, brand, model, serial, uaz, guard, location, details, funding, rfid} = req.body;
    // Se obtiene el código del tipo antes de almacenarlo en la DB
    try{ 
        const inventarioCalefaccion = new Inventario(
            {
                _id: new ObjectId(),
                description: descr,
                type: type,
                brand: brand,
                model: model,
                serial: serial,
                uaz: uaz,
                guard: guard,
                location: location,
                details: details,
                funding: funding,
                rfid: rfid
            
            }
        );

        inventarioCalefaccion.save(async function(err) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            } else {
                console.log('T');
                res.sendStatus(200);
            }
        });
    } catch(err) {
        console.error(err);
    }
});

// Ruta para actualizar
router.put('/inventario/edit/:id', async (req, res) => {
    var {descr, type, brand, model, serial, uaz, guard, location, details, funding, rfid} = req.body;
    
    try{
        const inventarioCalefaccion = await Inventario.findByIdAndUpdate(req.params.id, 
            {
                $set: {
                    description: descr,
                    type: type,
                    brand: brand,
                    model: model,
                    serial: serial,
                    uaz: uaz,
                    guard: guard,
                    location: location,
                    details: details,
                    funding: funding,
                    rfid: rfid
                }
            });
            res.sendStatus(200);
    } catch(err) {
        console.error(err);
        res.sendStatus(500);
    }
});

// Ruta para eliminar
router.delete('/inventario/delete', async (req, res) => {
    var { descr, rfid} = req.body;
    const inventarioCalefaccion = Inventario.findOneAndDelete({description:descr, rfid: rfid}).exec(function (err, inventarioCalefaccion) {
        if (err) {
            res.sendStatus(500);
        } else {
            res.sendStatus(200);
        }
    });
});

module.exports = router;