const hbs = require('hbs');
const funciones = require('./funciones');

hbs.registerHelper('listarCursos', () => {
    let cursosCreados = funciones.cursosCreados();
    let texto = "<table> \
                    <thead> \
                        <th> Id </th> \
                        <th> Nombre </th> \
                        <th> Descripción </th> \
                        <th> Valor </th> \
                        <th> Modalidad </th> \
                        <th> Intensidad horaria </th> \
                    </thead> \
                <tbody>";

                cursosCreados.forEach(element => {
        texto =  texto + '<tr>' + 
                 '<td>' + element.id + '</td>' +
                 '<td>' + element.nombre + '</td>' +
                 '<td>' + element.descripcion + '</td>' +
                 '<td>' + element.valor + '</td>' +
                 '<td>' + element.modalidad + '</td>' +
                 '<td>' + element.intensidadHoraria + '</td>' +
                 '</tr>';
    });

    texto = texto + '</tbody></table>';

    return texto;
});