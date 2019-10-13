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

module.exports = router;