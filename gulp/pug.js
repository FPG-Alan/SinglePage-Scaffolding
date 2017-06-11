var gulp = require('gulp');
var _ = require('lodash');

var pug = require("gulp-pug");
var foreach = require('gulp-foreach');

var data = require('gulp-data');

// html tasks...
gulp.task('build_index_html', function () {
	return gulp.src(paths.source + '/index.pug')
		.pipe(pug({
			pretty: true,
			locals: {
				'root': './'
			}
		})).pipe(gulp.dest(paths.build));
});

gulp.task('build_page_html', function () {
	return gulp.src(paths.source + '/pages/**/*.pug')
		.pipe(foreach(function (stream, file) {

			var datapath = file.path.substr(0, file.path.lastIndexOf(isWin ? "\\" : '/')) + slash + 'data' + slash + 'index.json';
			delete require.cache[datapath];

			return stream.pipe(data(function (file) {
				var json = require(datapath);
      			var data = _.assign({}, json, {root: '../'});
				return data;
			})).pipe(pug({
				pretty: true
			})).pipe(gulp.dest(paths.build));
		}))
});