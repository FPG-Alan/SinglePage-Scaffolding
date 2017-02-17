var gulp = require('gulp');

var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');

// img tasks...
gulp.task('build_image', function () {
  return  gulp.src(paths.source + '/assets/images/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(paths.build + '/assets/images'));
});