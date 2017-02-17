var gulp = require('gulp');

gulp.task('copy_assets', function () {
  return  gulp.src(paths.source + '/assets/**/*')
    .pipe(gulp.dest(paths.build + '/assets'));
});

// img tasks...
gulp.task('build_font', function () {
  return  gulp.src(paths.source + '/assets/fonts/*')
    .pipe(gulp.dest(paths.build + '/assets/fonts'));
});
gulp.task('copy_other_assets',function(){
  return  gulp.src([paths.source + '/assets/**','!'+ paths.source + '/assets/images/','!'+ paths.source + '/assets/images/*','!'+ paths.source + '/assets/fonts/','!'+ paths.source + '/assets/fonts/*'])
    .pipe(gulp.dest(paths.build + '/assets'));
});