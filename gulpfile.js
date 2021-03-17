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
const {
    series,
    src,
    dest,
    watch
} = require('gulp');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const notify = require('gulp-notify');
const webp = require('gulp-webp');
const concat = require('gulp-concat');

//Utilidades CSS
const autoprefixer = require('autoprefixer');
const postcss = require('gulp-postcss');
const cssnano = require('cssnano');
const sourcemaps = require('gulp-sourcemaps');

//Utilidades JS
const terser = require('gulp-terser-js');
const rename = require('gulp-rename');

const paths = {
    imagenes: 'src/img/**/*',
    scss: 'src/scss/**/*.scss',
    js: 'src/js/**/*.js'
}

//Funcion que compila SASS a css 
function css() {
    return src(paths.scss)
        .pipe(sourcemaps.init()) //hace un mapeo del codigo para saber en que linea esta cada cosa despues de ser minificado
        .pipe(sass())
        .pipe(postcss([autoprefixer(), cssnano()])) //cssnano minifica el codigo y autoprefix lo mejora con prefijos
        .pipe(sourcemaps.write('.')) //hace un mapeo del codigo para saber en que linea esta cada cosa despues de ser minificado
        .pipe(dest('./build/css'))
}


//Funcion que compila SASS a css con el codigo expandible legible
function expandidocss() {
    return src(paths.scss)
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(dest('./build/css'))
}

function imagenes() {
    return src(paths.imagenes)
        .pipe(imagemin())
        .pipe(dest('./build/img'))
        .pipe(notify({
            message: 'Imagen Minificada'
        }));
}

function versionwebp() {
    return src(paths.imagenes)
        .pipe(webp())
        .pipe(dest('./build/img'))
        .pipe(notify({
            message: 'version webP Lista'
        }));
}

function javascript() {
    return src(paths.js)
        .pipe(sourcemaps.init())
        .pipe(concat('blunde.js'))
        .pipe(terser()) //minifica el codigo de js
        .pipe(sourcemaps.write('.'))
        .pipe(rename({ suffix: '.min'}))
        .pipe(dest('./build/js'))
}

//wacht automatiza los cambios, si un archivo es modificado watch detecta los cambios y ejecuta funcion css que es la que compila el scss a css
function watchArchivos() {
    watch(paths.scss, css); // * = la carpeta actual -  ** = todas las carpetas  y todos sus archivos con esa extencion
    watch(paths.js, javascript);
}

// se ejecutan en la consola con el comando gulp seguido del nombre de la tarea ejem: gulp css
exports.css = css;
exports.expandidocss = expandidocss;
exports.imagenes = imagenes;
exports.watchArchivos = watchArchivos; //Esta tarea esta activa siempre detectando los cambios para detenerla en la terminal usas ctrl c, o eliminas la terminal
exports.default = series(css, javascript, imagenes, versionwebp, watchArchivos);