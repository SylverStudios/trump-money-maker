var fs = require('fs');

var gulp = require('gulp');
var util = require('gulp-util');
var size = require('gulp-size');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');
var scsslint = require('gulp-scss-lint');
var rimraf = require('rimraf');


var generateWebpackConfig = require('./generateWebpackConfig.js');
var webpackStream = require('webpack-stream');


// setup
var environment = util.env.type || 'development';

var srcDir = './src';
var buildDir = './build';
var jsDir = '/js';
var styleDir = '/style';
var imagesDir = '/images';

var styleFile = '';

var mainEntry = '/main.js';
var artifactName = 'bundle.js';
var scssFileName = '';
var webpackConfig = generateWebpackConfig(srcDir + mainEntry, artifactName);


function doWebpack(config) {
  return gulp.src(config.entry)
      .pipe(webpackStream(config))
      .pipe(environment === 'production' ? uglify() : util.noop())
      .pipe(gulp.dest(buildDir + jsDir))
      .pipe(size({ title: 'js' }))
      ;
}

function fsExistsSync(filePath) {
  try {
    fs.statSync(filePath);
    return true;
  } catch (err) {
    return false;
  }
}

function mkdirsIfMissing() {
  for (var i = 0; i < arguments.length; i++) {
    if (!fsExistsSync(arguments[i])) fs.mkdirSync(arguments[i]);
  }
}
function rmIfExists() {
  for (var i = 0; i < arguments.length; i++) {
    if (fsExistsSync(arguments[i])) rimraf.sync(arguments[i]);
  }
}

var utilTasks = {
  'setup-build': function() {
    mkdirsIfMissing(
        buildDir,
        buildDir + imagesDir,
        buildDir + styleDir,
        buildDir + jsDir
    );
  },
  'clean': function () {
    rmIfExists(buildDir);
  },
  'lint-js': function () {
    return gulp.src('src/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        ;
  },
};

var buildTasks = {
  'build-js': function () {
    return doWebpack(webpackConfig.getConfig(environment));
  },
  'build-html': function () {
    return gulp.src(srcDir + '/index.html')
        .pipe(gulp.dest(buildDir));
  },
  'build-scss': function () {
    return gulp.src(srcDir + scssFileName)
        .pipe(sass({
          includePaths: [
            './node_modules/bootstrap-sass/assets/stylesheets',
          ],
        }).on('error', sass.logError))
        .pipe(rename('main.css'))
        .pipe(gulp.dest(buildDir))
        .pipe(size({ title: 'css' }))
        ;
  },
  'build-images': function () {
    return gulp.src([srcDir + imagesDir + '/*'])
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(buildDir + imagesDir));
  },
};

var watchTasks = {
  'watch-js': function () {
    var config = webpackConfig.getConfig(environment);
    config.watch = true;
    return doWebpack(config);
  },
  'watch-scss': function () {
    return gulp.watch(
        [srcDir + styleDir + styleFile],
        ['build-scss']
    );
  },
};

gulp.task('setup-build', utilTasks['setup-build']);
gulp.task('clean', utilTasks.clean);

// Build - NO SCSS FOR RIGHT NOW
gulp.task('build-js', buildTasks['build-js']);
gulp.task('build-html', buildTasks['build-html']);
gulp.task('build-scss', buildTasks['build-scss']);
gulp.task('build-images', buildTasks['build-images']);
gulp.task('build', ['setup-build', 'build-js', 'build-html', 'build-images']);

// Watch
gulp.task('watch-js', watchTasks['watch-js']);
gulp.task('watch-scss', watchTasks['watch-js']);
gulp.task('watch', ['setup-build', 'watch-js', 'watch-scss']);

// NO SCSS LINTING YET
gulp.task('lint-js', utilTasks['lint-js']);
gulp.task('lint', ['lint-js']);
