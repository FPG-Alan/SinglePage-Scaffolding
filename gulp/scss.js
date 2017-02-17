var gulp = require('gulp');
var concat = require('gulp-concat');

var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

// css tasks...
var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
};
gulp.task('build_style', function() {
    return gulp.src(['./src/pages/**/*.scss','./src/*scss','./src/*css'])
    	.pipe(concat('style.min.scss'))
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./build/'))
        .pipe(reload({stream: true}));
});