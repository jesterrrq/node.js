const { src, dest, series, parallel, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const plumber = require('gulp-plumber');
const browserSync = require('browser-sync').create();

const paths = {
  html: { src: 'src/*.html', dest: 'dist/' },
  styles: { src: 'src/scss/*.scss', dest: 'dist/css/' }
};

function html() {
  return src(paths.html.src)
    .pipe(dest(paths.html.dest))
    .pipe(browserSync.stream());
}

function styles() {
  return src(paths.styles.src)
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ cascade: false }))
    .pipe(cleanCss({ level: { 1: { specialComments: 0 } } }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({ server: { baseDir: 'dist' } });
  watch(paths.html.src, html);
  watch(paths.styles.src, styles);
}

exports.html = html;
exports.styles = styles;
exports.serve = serve;
exports.default = parallel(styles, html, serve);