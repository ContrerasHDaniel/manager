// url base
var url = "/inventario/";
function updateInv(id, descr, type, brand, model, series, uaz, guard, location, details, funding, rfid) {
    url = "/inventario/";
    // Se formatean los datos a un modelo JSON
    var datosJS = JSON.stringify({"id": id, "descr": descr, "type": type, "brand": brand, "model": model, "serial": series, "uaz": uaz, "guard": guard, "details": details, "location": location, "funding": funding, "rfid": rfid});
    // Se convierten los datos a un objeto JSON
    var datos = JSON.parse(datosJS);

    // Petición Ajax tipo PUT para actualizar los datos de una tarjeta dada
    $.ajax({
        url: url+"edit/"+id,
        type: 'PUT',
        data: datos,
        success: function(res){
            alert('Registro modificado con éxito');
            $('#updateModal').modal('hide');
            //recarga la pagina
            document.location.reload(true);
        },
        statusCode: {
            500: function () {
                alert('Algo salió mal');
            }
        }
    });
}

function createInv(descr, type, brand, model, series, uaz, guard, location, details, funding, rfid) {
    url = "/inventario/";
    // Se formatean los datos a un modelo JSON
    var datosJS = JSON.stringify({"descr": descr, "type": type, "brand": brand, "model": model, "serial": series, "uaz": uaz, "guard": guard, "details": details, "location": location, "funding": funding, "rfid": rfid});
    // Se convierten los datos a un objeto JSON
    var datos = JSON.parse(datosJS);

    // Petición Ajax tipo POST para insertar nuevo registro a inventario
    $.ajax({
        url: url,
        type: 'POST',
        data: datos,
        success: function (res) {
            alert(res);
            $('#createModal').modal('hide');
            //recarga la pagina
            document.location.reload(true);
        },
        statusCode: {
            500: function() {
                alert('Algo salió mal');
            }
        }
    });
}

function deleteInv(descr, rfid) {
    url = "/inventario/";
    // Se formatean los datos a un modelo JSON
    var datosJS = JSON.stringify({"descr": descr, "rfid":rfid});
    // Se convierten los datos a un objeo JSON
    var datos = JSON.parse(datosJS);

    $.ajax({
        url: url+"delete",
        type: 'DELETE',
        data: datos,
        success: function (res) {
            alert(res);
            $('deleteModal').modal('hide');
            // Recarga la pagina
            document.location.reload(true);
        }
    });
}