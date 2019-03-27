const fs = require('fs');

let cursos = []

let inscribirCurso = (id, nombre, descripcion, valor, modalidad, intensidadHoraria) => {
    listarCursos();

    let cursoEncontrado = cursos.find(curso => curso.id == id);

    if(!cursoEncontrado){
        cursos.push({
            'id' : id,
            'nombre' : nombre,
            'descripcion' : descripcion,
            'valor' : valor,
            'disponible' : true,
            'modalidad' : modalidad,
            'intensidadHoraria': intensidadHoraria
        });

        guardar();
    } else {
        console.log('el id ya está duplicado.')
    }
};

let listarCursos = () =>{
    try {
        cursos = require('../cursos.json');
    } catch(err) {
        cursos = [];
    }
}

let cursosCreados = () => {
    listarCursos();
    return cursos;
};

let guardar = () => {
    let datos = JSON.stringify(cursos,null, 1);

    fs.writeFile('./cursos.json', datos, (err) => {
        if(err) {
            throw err;
        }
        console.log('Archivo creado con éxito'); 
    });
};

let validarCursoExistente = (id) => {
    listarCursos();

    let cursoExistente = cursos.find(curso => curso.id == id);
    if(!cursoExistente)
        return false;
    else
        return true;
};

module.exports = {
    inscribirCurso,
    cursosCreados,
    validarCursoExistente
};