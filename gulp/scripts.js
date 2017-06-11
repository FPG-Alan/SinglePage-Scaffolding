var gulp = require('gulp');
var webpack = require('webpack');

var webpackProdConfig = require('../webpack.prod.config');

gulp.task('build_scripts', function(cb) {
    webpack(webpackProdConfig, function(err, stats) {
        cb();
    });
});



