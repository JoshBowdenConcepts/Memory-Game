'use strict';

var gulp       = require('gulp'),
  concat       = require('gulp-concat'),
  uglify       = require('gulp-uglify'),
  sass         = require('gulp-sass'),
  cleanCSS     = require('gulp-clean-css'),
  sourcemaps   = require('gulp-sourcemaps'),
  image        = require('gulp-image'),
  clean        = require('gulp-clean'),
  sequence     = require('gulp-sequence'),
  replace      = require('gulp-replace'),
  connect      = require('gulp-connect'),
  fs           = require('fs');


gulp.task("scripts", function() {
  return gulp.src('./js/**/*.js')
  .pipe(sourcemaps.init())
    .pipe(concat("all.min.js"))
    // .pipe(uglify())
  // .pipe(sourcemaps.write('../maps'))
  .pipe(gulp.dest('./dist/scripts'))
  .pipe(connect.reload());
});

gulp.task("styles", function() {
  return gulp.src('./sass/**/*.scss')
  .pipe(sourcemaps.init())
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(concat("all.min.css"))
    .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(sourcemaps.write('../maps'))
  .pipe(gulp.dest('./dist/styles'))
  .pipe(connect.reload());
});

gulp.task('images', function () {
  return gulp.src('./images/*')
    .pipe(image())
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('clean', function() {
  return gulp.src('./dist')
    .pipe(clean({force: true}));
});

gulp.task('connect', function() {
  return connect.server({
    root: 'dist',
    port: 9000,
    livereload: true
  });
});

gulp.task('moveindex', function(){
    return gulp.src('index.html')
      .pipe(gulp.dest('./dist'))
      .pipe(connect.reload());
});

gulp.task('watchSass', function() {
  return gulp.watch('sass/**/*.scss', ['styles']);
});

gulp.task('watchHtml', function() {
  return gulp.watch('index.html', ['moveindex']);
});

gulp.task('watchJS', function() {
  return gulp.watch('js/**/*.js', ['scripts']);
});

gulp.task('onefile', function () {
  return gulp.src(['./dist/index.html'])
    .pipe(replace('<link href="./styles/all.min.css" rel="stylesheet" />', function(s) {
      var style = fs.readFileSync('./dist/styles/all.min.css', 'utf8');
      return '<style>\n' + style + '\n</style>';
    }))
    .pipe(replace('<script type="text/javascript" src="./scripts/all.min.js"></script>', function(s) {
      var script = fs.readFileSync('./dist/scripts/all.min.js', 'utf8');
      return '<script>\n' + script + '\n</script>';
    }))
    .pipe(gulp.dest('./build/'))
    .pipe(connect.reload());
});

gulp.task("build", sequence('clean', ['scripts', 'styles', 'watchSass', 'watchJS', 'images'], ['moveindex'], 'watchHtml'));

gulp.task("default", sequence('build', ['connect']));
