var gulp = require('gulp');
var webpack = require('webpack');

var webpackConfig = require('../webpack.config');

gulp.task('build_scripts', function(cb) {
    webpackConfig.watch = false;
    webpack(webpackConfig, function(err, stats) {
        cb();
    });
});



