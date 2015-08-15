var gulp            = require('gulp'),
    bowerFiles      = require('main-bower-files'),
    sass            = require('gulp-sass'),
    inject          = require('gulp-inject'),
    eventStream     = require('event-stream');

var config = {
  sassFiles:  './scss',
  bowerFiles: './bower_components'
}

gulp.task('default', function() {

  var css = gulp.src('./scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('./css'));

  gulp.src('./index.html')
    .pipe(inject(
        eventStream.merge(
          css,
          gulp.src('./js/*.js', {read: false}),
          gulp.src(
            bowerFiles(), { base: 'bower_components', read:false}
          )
        )
    ))
    .pipe(gulp.dest('./'));

})
