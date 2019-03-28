const hbs = require('hbs');
const funciones = require('./funciones');

hbs.registerHelper('listarCursos', () => {
    let cursosCreados = funciones.cursosCreados();
    let texto = "<table class=\"table\"> \
                    <thead class=\"thead-dark\"> \
                        <th scope=\"col\"> Id </th> \
                        <th scope=\"col\"> Nombre </th> \
                        <th scope=\"col\"> Descripción </th> \
                        <th scope=\"col\"> Valor </th> \
                        <th scope=\"col\"> Modalidad </th> \
                        <th scope=\"col\"> Intensidad horaria </th> \
                        <th scope=\"col\"> Estado </th> \
                    </thead> \
                <tbody>";

    cursosCreados.forEach(element => {
        let estadoCurso = (element.estado)? 'Disponible' : 'Cerrado';
        texto =  texto + '<tr>' + 
                 '<td>' + element.id + '</td>' +
                 '<td>' + element.nombre + '</td>' +
                 '<td>' + element.descripcion + '</td>' +
                 '<td>' + element.valor + '</td>' +
                 '<td>' + element.modalidad + '</td>' +
                 '<td>' + element.intensidadHoraria + '</td>' +
                 '<td>' + estadoCurso + '</td>' +
                 '</tr>';
    });

    texto = texto + '</tbody></table>';

    return texto;
});

hbs.registerHelper('listaCursosAmigable', () => {
    let cursosCreados = funciones.cursosCreados();
    let texto = "<div id=\"accordion\">";

    for(let i = 0; i < cursosCreados.length; i++){

        if(cursosCreados[i].estado == true){
        texto = texto +  '<div class="card">' 
                      +  '<div class="card-header" id="heading' + i +'">'
                      +  '<h5 class="mb-0">'
                      +  '<button class="btn btn-link" data-toggle="collapse" data-target="#collapse' + i + '" aria-expanded="true" aria-controls="collapse' + i +'">'
                      +  'Nombre del curso: ' + cursosCreados[i].nombre
                      +  '</button>'
                      +  'Valor del Curso:' + cursosCreados[i].valor  
                      +  '</h5>'
                      +  '</div>'
                      +  '<div id="collapse' + i + '" class="collapse" aria-labelledby="heading' + i + '" data-parent="#accordion">'
                      + '<div class="card-body">'
                      + '<ul class="list-group">'
                      + ' <li class="list-group-item"><b>Nombre: </b>' + cursosCreados[i].nombre + '</li>'
                      + ' <li class="list-group-item"><b>Valor: </b>' + cursosCreados[i].valor + '</li>'
                      + ' <li class="list-group-item"><b>Descripción: </b>' + cursosCreados[i].descripcion + '</li>'
                      + ' <li class="list-group-item"><b>Modalidad: </b>' + cursosCreados[i].modalidad + '</li>'
                      + ' <li class="list-group-item"><b>Intensidad: </b>' + cursosCreados[i].intensidadHoraria + '</li>'
                      + '</ul>'
                      + '</div>'
                      + '</div>'
                      + '</div>'; 
        }
    }

    texto = texto + '</div>';
    return texto;
});

hbs.registerHelper('cursosDisponiblesSelect', () => {
    let cursosDisponibles = funciones.cursosCreados().filter(item => item.estado == true);
    let texto = '';

    cursosDisponibles.forEach(curso => {
        texto += '<option value=' + curso.id + '>' + curso.nombre + '</option>';
    })
    return texto;
});

hbs.registerHelper('inscritosCursos', () => {
    let cursosActivos = funciones.cursosCreados().filter(item => item.estado == true);

    let texto = '<div id="accordion">';

    cursosActivos.forEach(curso => {
        let estudiantesCursos = funciones.estudiantesCursosLista().filter(item => item.idCurso == curso.id);
        texto = texto +  '<div class="card">' 
                      +  '<div class="card-header" id="heading' + curso.id +'">'
                      +  '<h5 class="mb-0">'
                      +  '<button class="btn btn-link" data-toggle="collapse" data-target="#collapse' + curso.id + '" aria-expanded="true" aria-controls="collapse' + curso.id +'">'
                      +  'Nombre del curso: ' + curso.nombre
                      +  '</button>'
                      +  'Valor del Curso:' + curso.valor
                      +  '<form action="/verInscritos" method="post" ><input type="hidden"  name="idCurso" value="' + curso.id + '"/><input type="submit" value="Terminar"></form>'
                      +  '</h5>'
                      +  '</div>'
                      +  '<div id="collapse' + curso.id + '" class="collapse" aria-labelledby="heading' + curso.id + '" data-parent="#accordion">'
                      +  '<div class="card-body">'

                      + '<table class="table">'
                      + '<thead class="thead-dark">'
                      + '<th scope="col"> Documento </th>'
                      + '<th scope="col"> Correo electrónico </th>'
                      + '<th scope="col"> Nombre </th>'
                      + '<th scope="col"> Télefono </th>'
                      + '<th scope="col"> Curso </th>'
                      + '</thead>'
                      + '<tbody>';

        for(let i = 0; i<estudiantesCursos.length ; i++) {
            texto = texto + '<tr>' 
                            + '<td>' + estudiantesCursos[i].documento + '</td>' 
                            + '<td>' + estudiantesCursos[i].email + '</td>'
                            + '<td>' + estudiantesCursos[i].nombre + '</td>' 
                            + '<td>' + estudiantesCursos[i].telefono + '</td>' 
                            + '<td>' + curso.nombre + '</td>'
                            + '</tr>';
        };

        texto = texto + '</tbody></table></div></div></div>';
    });

    return texto;
});