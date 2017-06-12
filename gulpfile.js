var gulp = require('gulp');
var watch = require('gulp-watch');

var webpack = require('webpack');
var webpackDevConfig = require('./webpack.dev.config');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');

var del = require('del');
var path = require('path');
var stripAnsi = require('strip-ansi');
var requireDir = require('require-dir');
var runSequence = require('run-sequence');

var browserSync = require('browser-sync');
var reload = browserSync.reload;

global.bundler = null;
global.isWin = /^win/.test(process.platform);
global.slash = isWin ? '\\' : '/';

global.paths = {
  'source': path.join(__dirname, 'src'),
  'build': path.join(__dirname, 'build')
};

// require all task in gulp dir
requireDir('./gulp', { recurse: false });




gulp.task('clean', function () {
  return del([
    paths.build + '/**/*',
    paths.build + '/**',
    paths.build + '/*'
  ]);
});

gulp.task('pug_watch', ['build_index_html', 'build_page_html'], reload);

gulp.task('start_serve', function () {
  browserSync({
    server: paths.build,
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackDevConfig.output.publicPath,
        stats: { colors: true },
        
      }),
      webpackHotMiddleware(bundler)
    ],
    plugins: ['bs-fullscreen-message']
  });

  gulp.watch([paths.source + '/pages/**/*.scss', paths.source + '/*.scss', paths.source + '/*.css'], ['build_style']);
  gulp.watch([paths.source + '/pages/**/*.pug', paths.source + '/includes/*.pug', paths.source + '/*.pug', paths.source + '/pages/**/*.json'], ['pug_watch']);
  gulp.watch([paths.source + '/assets/images/*'], ['copy_assets']);
  gulp.watch([paths.source + '/assets/video/*'], ['copy_other_assets']);
});

gulp.task('serve', function (callback) {
  bundler = webpack(webpackDevConfig);
  bundler.plugin('done', function (stats) {
    if (stats.hasErrors() || stats.hasWarnings()) {
      return browserSync.create().sockets.emit('fullscreen:message', {
        title: "Webpack Error:",
        body: stripAnsi(stats.toString()),
        timeout: 100000
      });
    }
    // browserSync.reload();
  });
  runSequence('clean', 'build_style', 'build_index_html', 'build_page_html', 'copy_assets', 'start_serve', callback);
});

gulp.task('build', function (callback) {
  runSequence('clean', 'build_style', 'build_index_html', 'build_page_html', 'build_image', 'build_font', 'build_scripts', 'copy_other_assets', callback);
});