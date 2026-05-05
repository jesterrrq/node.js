const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer').default; // ← ВАЖНО: .default
const cleanCss = require('gulp-clean-css');
const rename = require('gulp-rename');
const browserSync = require('browser-sync').create();

const paths = {
  html: 'src/*.html',
  scss: 'src/scss/*.scss',
  dist: 'dist'
};

function html() {
  return src(paths.html)
    .pipe(dest(paths.dist))
    .pipe(browserSync.stream());
}

function styles() {
  return src(paths.scss)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({ overrideBrowserslist: ['last 2 versions'], cascade: false }))
    .pipe(cleanCss({ level: { 1: { specialComments: 0 } } }))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest(paths.dist + '/css'))
    .pipe(browserSync.stream());
}

function serve() {
  browserSync.init({
    server: { baseDir: paths.dist },
    open: true,
    notify: false,
    port: 3000
  });
  watch(paths.html, html);
  watch(paths.scss, styles);
}

exports.default = series(styles, html, serve);
