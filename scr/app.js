const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser')
const funciones = require('./funciones');

require('./helpers');

/***************************** BOOTSTRAP *****************************/
const dirNode_modules = path.join(__dirname , '../node_modules')

app.use('/css', express.static(dirNode_modules + '/bootstrap/dist/css'));
app.use('/js', express.static(dirNode_modules + '/jquery/dist'));
app.use('/js', express.static(dirNode_modules + '/popper.js/dist'));

app.use('/js', express.static(dirNode_modules + '/bootstrap/dist/js'));
/********************************************************************/

const directorioPublico = path.join(__dirname, '../public' );
const directoriopartial = path.join(__dirname, '../partials')

app.use(express.static(directorioPublico));
hbs.registerPartials(directoriopartial);
app.use(bodyParser.urlencoded({extended : true}));

app.set('view engine', 'hbs');

app.get('/cursos', (req, res) => {
    res.render('crearCursos', {
        titulo : 'Crear nuevo curso'
    });
});

app.post('/cursos', (req, res) => {
    let cursoExistente = funciones.validarCursoExistente(req.body.id);

    if(cursoExistente){
        res.render('error', {
            titulo : 'Error al crear el curso',
            mensajeError : 'El curso identificado con ese ID ya existe. Por favor, verificar los datos.'
        });
    }
    else  {
        funciones.crearCurso(req.body.id, 
                            req.body.nombre, 
                            req.body.descripcion, 
                            parseInt(req.body.valor),
                            (req.body.modalidad === undefined)? '-' : req.body.modalidad,
                            req.body.intensidadHoraria);

        res.render('listarCursos');
    }
});

app.get('/inscribir', (req, res) => {
    res.render('inscribir');
});

app.post('/inscribir', (req, res) => {
     if(funciones.valiarEstudianteInscrito(req.body.idCurso, req.body.documento)){
        res.render('error', {
            titulo : 'Error al inscribir el estudiante',
            mensajeError : 'El estudiante ya está inscrito al curso seleccionado. Por favor validar nuevamente la inscripción.'
        });
    } else {
        funciones.inscribirEstudiante(req.body.documento, req.body.email, req.body.nombre, req.body.telefono, req.body.idCurso);
        res.render('inscribir');
    }
});

app.patch('/inscribir',(req, res) => {    
    funciones.terminarCurso(req.body.idCurso);
    res.render('inscribir');
});

app.listen(3000, ()=> {
    console.log('escuchando por el puerto 3000.'); 
});