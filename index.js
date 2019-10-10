const express = require('express');
const path = require('path');
const exhbs = require('express-handlebars');
const Handlebars = require('handlebars');


// Var inits
const app = express();
require('./dbconnect');

// Settings
app.set('port',process.env.PORT || 3001);
app.set('views', path.join(__dirname,'views'));
app.engine('hbs',
                exhbs({
                    defaultLayout: 'main',
                    layoutsDir: path.join(app.get('views'), 'layouts'),
                    partialsDir: path.join(app.get('views'), 'partials'),
                    extname: '.hbs',
                    helpers: {
                        fillLab: function(equipoLab){
                            var str = "";
                            equipoLab.forEach(equipo => {
                                str += '<tr id=\"'+ equipo._id +'\"role=\"row\" data-toggle=\"modal\" data-target=\"#updateModal\">'
                                + '<td class=\"sorting_1\" id=\"desc\">' + equipo.description + '</td>'
                                + '<td id=\"type\">' + typesSpa.get(equipo.type) + '</td>'
                                + '<td id=\"brand\">' + equipo.brand + '</td>'
                                + '<td id=\"model\">' + equipo.model + '</td>'
                                + '<td id=\"series\">' + equipo.serial + '</td>'
                                + '<td id=\"uaz\">' + equipo.uaz + '</td>'
                                + '<td id=\"guard\">' + equipo.guard + '</td>'
                                + '<td id=\"location\">' + equipo.location + '</td>'
                                + '<td id=\"details\">' + equipo.details + '</td>'
                                + '<td id=\"funding\">' + equipo.funding + '</td>'
                                + '<td id=\"rfid\">' + equipo.rfid + '</td></tr>'
                            });

                            return new Handlebars.SafeString(str);
                        },

                        fillTarjetas: function(tarjetas){
                            var str = "";
                            tarjetas.forEach(tarjeta => {
                                str += '<tr id=\"'+ tarjeta._id +'\"role=\"row\" data-toggle=\"modal\" data-target=\"#updateModal\">'
                                + '<td class=\"sorting_1\" id=\"desc\">' + tarjeta.description + '</td>'
                                + '<td id=\"brand\">' + tarjeta.brand + '</td>'
                                + '<td id=\"model\">' + tarjeta.model + '</td>'
                                + '<td id=\"series\">' + tarjeta.series + '</td>'
                                + '<td id=\"uaz\">' + tarjeta.uaz + '</td></tr>'
                            });

                            return new Handlebars.SafeString(str);
                        }
                    }
                }));

app.set('view engine','.hbs');

// Middlewares
app.use(express.urlencoded({extended:true}));



// Global variables
// mapa de los tipos de inventario con acento
typesSpa = new Map();
typesSpa.set("cal","Calefacci&oacuten");
typesSpa.set("comp","C&oacutemputo");
typesSpa.set("tools","Herramientas");
typesSpa.set("lab","Laboratorio");
typesSpa.set("ofc","Oficina");
typesSpa.set("pry","Proyecci&oacuten");
typesSpa.set("net","Redes");
typesSpa.set("sec","Seguridad");
// mapa de los tipos de inventario sin acento y en minúsculas
// (útil para comparación en las rutas)
types = new Map();
types.set("calefaccion","cal");
types.set("computo","comp");
types.set("herramientas","tools");
types.set("laboratorio","lab");
types.set("oficina","ofc");
types.set("proyeccion","pry");
types.set("redes","net");
types.set("seguridad","sec");

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/calefaccion'));
app.use(require('./routes/computo'));
app.use(require('./routes/tools'));
app.use(require('./routes/laboratorio'));
app.use(require('./routes/oficina'));
app.use(require('./routes/proyeccion'));
app.use(require('./routes/redes'));
app.use(require('./routes/seguridad'));
app.use(require('./routes/tarjetas'));

// Static Files
app.use(express.static(__dirname + '/public'));

// Server init
server = app.listen(app.get('port'), () => {
    console.log('Server on port ', app.get('port'));
});