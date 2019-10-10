function updateData(id, descr, brand, model, series, uaz){
    // Se formatean los datos a un modelo JSON
    var datosJS = JSON.stringify({descr: descr, brand: brand, model:model, series: series, uaz: uaz});
    // Se convierten los datos a un objeto JSON
    var datos = JSON.parse(datosJS);
    // url de actualización de tarjetas
    var url = "/inventario/tarjetas/edit/"+id;

    // Petición Ajax tipo PUT para actualizar los datos de una tarjeta dada
    $.ajax({
        url: url,
        type: 'PUT',
        data: datos,
        success: function(res){
            alert(res);
            $('#updateModal').modal('hide');
            //recarga la tabla
            location.reload();
        }
    });
}