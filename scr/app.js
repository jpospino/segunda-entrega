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

app.get('/crear', (req, res) => {
    res.render('crear');
});

app.post('/crear', (req, res) => {
    console.log(req.body);
    
    let cursoExistente = funciones.validarCursoExistente(req.body.id);

    if(cursoExistente){
        res.render('cursoExistente');
    }
    else  {
        funciones.inscribirCurso(req.body.id, 
                            req.body.nombre, 
                            req.body.descripcion, 
                            parseInt(req.body.valor),
                            (req.body.modalidad === undefined)? '-' : req.body.modalidad,
                            req.body.intensidadHoraria);

        res.render('cursos');
    }
});

app.listen(3000, ()=> {
    console.log('escuchando por el puerto 3000.'); 
});