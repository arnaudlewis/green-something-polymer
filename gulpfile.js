var gulp = require('gulp');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var autoprefixer = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

gulp.task('build-js', function () {
  browserify({
    entries: './app/assets/javascripts/app.js',
    extensions: ['.js'],
    debug: true
  })
  .transform("babelify",
    {
      presets: ["es2015", "react", "stage-0", "stage-1", "stage-2", "stage-3"]
    })
  .bundle()
  .on('error', function(err) {
    console.log(err.message + "\n\n === END OF STACK TRACE === \n\n")
  })
  .pipe(source('bundle.js'))
  .pipe(rename('trypolymer.js'))
  .pipe(gulp.dest('./public/compiled/'))
  .pipe(buffer())
  .pipe(uglify())
  .pipe(rename('dreamact.min.js'))
  .pipe(gulp.dest('./public/compiled/'));
});

gulp.task('watch-js', function() {
    gulp.watch(['./app/assets/javascripts//**/*.js', './app/assets/javascripts//**/*.jsx'], ['build-js']);
});

gulp.task('build-sass', function () {
    gulp.src('./app/assets/stylesheets/**/*.sass')
    .pipe(sass({errLogToConsole: true}))
    .on('error', function(err) {
      console.log(err.message + "\n\n === END OF STACK TRACE === \n\n")
    })
    .pipe(autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false}))
    .pipe(gulp.dest('./public/compiled/'))
    .pipe(minifyCSS())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('./public/compiled/'))
});

gulp.task('watch-sass', function() {
    gulp.watch(['./app/assets/stylesheets/**/*.sass'], ['build-sass']);
});

gulp.task('build', ['build-sass', 'build-js']);

gulp.task('default', ['build-sass', 'build-js', 'watch-sass', 'watch-js']);
