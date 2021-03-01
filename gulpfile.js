//INTRO

// //con series podemos compilar todas las funciones con un solo comando
// const { series, parallel } = require('gulp');

// function css( done ) {
//     console.log('Compilando .....SASS');

//     done();
// }

// function javascript( done ) {
//     console.log('Compilando .....JavaScript ');

//     done();
// }
// function minificandoHTML( done ) {
//     console.log('Minificando ....');

//     done();
// }

// //al momento de poner gulp en la termina ejecuta todas las funciones asociadas al series se ejecutan en el orden determinado
// exports.default = series( css, javascript, minificandoHTML ); 

// //al momento de poner gulp en la termina ejecuta todas las funciones asociadas al series al mismo tiempo terminando mas rapido las menos exigentes
// exports.default = parallel( css, javascript, minificandoHTML ); 



//Compilar SASS con Gulp
const { series, src, dest, watch } = require('gulp');
const sass = require('gulp-sass');

//Funcion que compila SASS a css 
function css( ) {
    return src('src/scss/app.scss')
    .pipe( sass( ))
    .pipe( dest('./build/css') )
}

//Funcion que compila SASS a css con el codigo comprimido
function minificarcss( ) {
    return src('src/scss/app.scss')
    .pipe( sass( {
        outputStyle: 'compressed'
    }) )
    .pipe( dest('./build/css') )
}

//Funcion que compila SASS a css con el codigo expandible legible
function expandidocss( ) {
    return src('src/scss/app.scss')
    .pipe( sass( {
        outputStyle: 'expanded'
    }) )
    .pipe( dest('./build/css') )
}

//wacht automatiza los cambios, si un archivo es modificado watch detecta los cambios y ejecuta funcion css que es la que compila el scss a css
function watchArchivos(){
    watch( 'src/scss/**/*.scss', css) // * = la carpeta actual -  ** = todas las carpetas  y todos sus archivos con esa extencion
}

// se ejecutan en la consola con el comando gulp seguido del nombre de la tarea ejem: gulp css
exports.css = css;
exports.minificarcss = minificarcss;
exports.expandidocss = expandidocss;
exports.watchArchivos = watchArchivos; //Esta tarea esta activa siempre detectando los cambios para detenerla en la terminal usas ctrl c, o eliminas la terminal


