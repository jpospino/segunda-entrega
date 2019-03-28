const fs = require('fs');

let cursos = []
let estudiantesCursos = [];

let crearCurso = (id, nombre, descripcion, valor, modalidad, intensidadHoraria) => {
    listarCursos();
    let cursoEncontrado = cursos.find(curso => curso.id == id);

    if(!cursoEncontrado){
        cursos.push({
            'id' : id,
            'nombre' : nombre,
            'descripcion' : descripcion,
            'valor' : valor,
            'estado' : true,
            'modalidad' : modalidad,
            'intensidadHoraria': intensidadHoraria
        });

        guardarCursos();
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

let listarEstudiantesCursos = () => {
    try {
        estudiantesCursos = require('../estudiantesCursos.json');
    } catch(err) {
        estudiantesCursos = [];
    }
}

let cursosCreados = () => {
    listarCursos();
    return cursos;
};

let estudiantesCursosLista = () => {
    listarEstudiantesCursos();
    return estudiantesCursos;
};

let guardarCursos = () => {
    let datos = JSON.stringify(cursos,null, 3);

    fs.writeFile('./cursos.json', datos, (err) => {
        if(err) {
            throw err;
        }
        console.log('Archivo creado con éxito'); 
    });
};

let guardarEstudiantesCursos = () => {
    let datos = JSON.stringify(estudiantesCursos,null, 3);

    fs.writeFile('./estudiantesCursos.json', datos, (err) => {
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

let valiarEstudianteInscrito = (idCurso, documento) => {
    listarEstudiantesCursos();
    if(estudiantesCursos.find(item => item.idCurso == idCurso && item.documento == documento)){
        return true;
    } else {
        return false;
    }
};

let inscribirEstudiante = (documento, email, nombre, telefono, idCurso) => {
    listarEstudiantesCursos();

    let inscripcionEncontrada = estudiantesCursos.find(inscripcion => inscripcion.idCurso == idCurso && inscripcion.documento == documento);

    if(!inscripcionEncontrada){
        estudiantesCursos.push({
            'documento' : documento, 
            'email' : email, 
            'nombre' : nombre, 
            'telefono' : telefono, 
            'idCurso' : idCurso
        });

        guardarEstudiantesCursos();
    } else {
        console.log('el estudiante ya está inscrito.')
    }
};  

let terminarCurso = (idCurso) => {
    listarCursos();

    let cursoTerminar = cursos.find(item => item.id == idCurso);
    cursoTerminar.estado = false;
    guardarCursos();
};

module.exports = {
    crearCurso,
    cursosCreados,
    validarCursoExistente,
    valiarEstudianteInscrito,
    inscribirEstudiante,
    estudiantesCursosLista,
    terminarCurso
};