var gulp    = require('gulp'),
    sass    = require('gulp-sass'),
    browserSync = require('browser-sync'),
    pug     = require('gulp-pug'),
    // rename  = require('gulp-rename'),
    uglify  = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    inject = require('gulp-inject'),
    prompt = require('gulp-prompt');

const configData = {
  "projectsName": "posadas-fiestarewards",
  "is_develop": false,
  "base_url": "https://www.gluo.mx/ux/projects/gluo-campaign/",
}

// const app = {
//   "serverPort": 3000,
//   "structure":{
//     "root": (configData.is_develop ? "./dist" : "./dist"),
//     "paths": {
//       "assets": "assets",
//       "css": "css",
//       "js": "js",
//       "finalCssName": "main.min.css"
//     },
//     "sass":{
//       "globalStyles":"src/scss/main.scss",
//       "output": "expanded",
//       "bowser-support": "last 3 versions",
//       "outputType": "compressed"
//     },
//     "watch":{
//       "pug":"src/pug/**/*.pug",
//       "sass":"src/assets/scss/**/*.scss",
//       "js":"src/js/**/*.js",
//       "assets":"src/assets/**/*",
//       "html": "*.html"
//     }
//   },
// }


function reload() {
  browserSync.init({
    port: 3000,
    server: configData.is_develop ? './local' : './dist'
  });
}

// Copy assets
function assets() {
  return (gulp.src(["src/assets/**/*","!src/assets/{scss,scss/**/*}"])
    .pipe(gulp.dest(configData.is_develop ? './local/' : './dist/')))
    .pipe(browserSync.stream())
}

function styles() {
  configData.is_develop = true;
  return (
    gulp.src('src/assets/scss/custom.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 3 versions'],
      cascade: false
    }))
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest(configData.is_develop ? './local/css' : './dist/css'))
    .pipe(browserSync.stream())
  );
}

// Volar
// function scripts() {
//   return (
//     gulp.src('src/js/**/*.js')
//     .pipe(gulp.dest('./dist/js'))
//     .pipe(browserSync.stream())
//   );
// }

function fonts(){
    return (
    gulp.src('src/assets/fonts/**/*')
    .pipe(gulp.dest(configData.is_develop ? './local/fonts' : './dist/fonts'))
  );
}

function stylesBuild() {
  return (
    gulp.src('src/assets/scss/custom.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 3 versions'],
      cascade: false
    }))
    // .pipe(sass({outputStyle: 'compressed'}))
    // .pipe(rename('main.min.css'))
    .pipe(gulp.dest(configData.is_develop ? './local/css' : './dist/css'))
    // .pipe(browserSync.stream())
  );
}

// function scriptsBuild() {
//   return (
//     gulp.src('src/js/**/*.js')
//     .pipe(uglify())
//     .pipe(gulp.dest('./dist/js'))
//     .pipe(browserSync.stream())
//   );
// }

// function html() {
//   return (
//     gulp.src('*.html')
//     .pipe(browserSync.stream())
//   );
// }

function views() {
  return (
    gulp.src('src/pug/pages/**/*.pug')
    .pipe(pug({
        pretty: true,
        locals: configData
    }))
    .pipe(gulp.dest(configData.is_develop ? './local' : './dist'))
    .on('end', browserSync.reload)
  )
}

// Tarea para preguntar por el archivo pug a compilar por si se requiere subir el html
function renderPug(){
  return(
    gulp.src( 'package.json' )
    .pipe( prompt.prompt([{
      type:'input',
      name:'source',
      message:'Ingresa la ruta del archivo pug a compilar:',
    },
    {
      type:'input',
      name:'dest',
      message:'Ingresa la ruta destino:',
    }], (res) => {
      compilePug(res.source, res.dest);
    }))
  );
}

// Compilar un solo pug
function compilePug(srcPath, destPath) {
  return (
    gulp.src(srcPath)
    .pipe(pug({
        pretty: true,
        locals: configData
    }))
    .pipe(gulp.dest(destPath))
  )
}

function watchTask(done) {
  // gulp.watch('*.html', html);
  gulp.watch('src/assets/scss/**/*.scss', styles);
  gulp.watch('src/assets/**/*', assets);
  gulp.watch('src/pug/**/*.pug', views);
  done();
}

function initTemplates(){
  // Iterate over html folder and inject html into index
  return (
    gulp.src('./ui-frontend-list.html')
    .pipe(inject(
      gulp.src('./local/**/*.html', { read: false }), {
        transform: function (filepath) {
          if (filepath.slice(-5) === '.html') {
            return '<li><a href="' + configData.base_url+filepath.slice(7) + '">' + filepath.slice(7) + '</a></li>';
          }
          return inject.transform.apply(inject.transform, arguments);
        }
      }
    ))
    .pipe(gulp.dest('./')) 
  )
}

const watch = gulp.series(gulp.parallel(styles, views, assets),watchTask, reload);
const build = gulp.series(gulp.parallel(stylesBuild, views, assets));
const templates = gulp.series(gulp.parallel(initTemplates));

exports.reload = reload;
exports.styles = styles;
exports.stylesBuild = stylesBuild;
// exports.html = html;
exports.views = views;
exports.renderPug = renderPug;
exports.assets = assets;
exports.watch = watch;
exports.build = build;
exports.templates = templates;
exports.default = watch;