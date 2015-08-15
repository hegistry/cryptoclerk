var gulp            = require('gulp'),
    bowerFiles      = require('main-bower-files'),
    sass            = require('gulp-sass'),
    inject          = require('gulp-inject'),
    eventStream     = require('event-stream');

var config = {
  sassFiles:  './scss',
  bowerFiles: './bower_components'
}

gulp.task('default', ['sass'], function() {
  var css = gulp.src('./css/*.css')

  gulp.src('./index.html')
    .pipe(inject(
        eventStream.merge(
          gulp.src(
            bowerFiles(), {read: false}
          ),
          css,
          gulp.src('./js/*.js', {read: false})
        )
    ), {addRootSlash: false})
    .pipe(gulp.dest(''));
})

gulp.task('sass', function () {
  gulp.src('./scss/**/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest(""));
});

gulp.task('sass:watch', function () {
  gulp.watch('./scss/**/*.scss', ['sass']);
});
