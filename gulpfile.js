var fs = require('fs');

var gulp = require('gulp');
var util = require('gulp-util');
var size = require('gulp-size');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var eslint = require('gulp-eslint');
var connect = require('gulp-connect');
var liveReload = require('gulp-livereload');
var scsslint = require('gulp-scss-lint');
var rimraf = require('rimraf');
var autoprefixer = require('gulp-autoprefixer');


var generateWebpackConfig = require('./generateWebpackConfig.js');
var webpackStream = require('webpack-stream');

// setup
var environment = util.env.type || 'development';

var srcDir = './src/';
var buildDir = './build/';
var imagesDir = 'images/';
var mediaDir = 'media/';
var soundsDir = 'sounds/';

var htmlEntry = 'index.html';
var htmlEntryFull = srcDir + htmlEntry;
var htmlArtifact = 'index.html';

var jsxEntry = 'entrypoint.jsx';
var jsxEntryFull = srcDir + jsxEntry;
var jsxArtifact = 'bundle.js';
var jsxWebpackConfig = generateWebpackConfig(jsxEntryFull, jsxArtifact);

var scssEntry = 'entrypoint.scss';
var scssEntryFull = srcDir + scssEntry;
var scssArtifact = 'app.css';

// connect config: the port that you'd like to run your dev server on
var servePort = 1337;

function doWebpack(config) {
  return gulp.src(config.entry)
    .pipe(webpackStream(config))
    .pipe(environment === 'production' ? uglify() : util.noop())
    .pipe(gulp.dest(buildDir))
    .pipe(size({ title: 'js' }))
    .pipe(connect.reload())
    .pipe(liveReload());
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
  'setup-build': function () {
    mkdirsIfMissing(
        buildDir,
        buildDir + imagesDir
    );
  },
  'clean': function () {
    rmIfExists(buildDir);
  },
  'lint-js': function () {
    return gulp.src(['src/**/*.{js,jsx}', '!node_modules/**', 'test/**/*'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError())
        ;
  },
  'lint-scss': function() {
    return gulp.src(['src/**/*.scss'])
        .pipe(scsslint())
        ;
  },
};

var buildTasks = {
  'build-html': function () {
    return gulp.src(htmlEntryFull)
        .pipe(gulp.dest(buildDir));
  },
  'build-js': function () {
    return doWebpack(jsxWebpackConfig.getConfig(environment));
  },
  'build-scss': function () {
    return gulp.src(scssEntryFull)
        .pipe(sass().on('error', sass.logError))
        .pipe(rename(scssArtifact))
        .pipe(autoprefixer())
        .pipe(gulp.dest(buildDir))
        .pipe(size({title: 'css'}));
  },
  'build-images': function () {
    return gulp.src([srcDir + imagesDir + '/**'])
        .pipe(gulp.dest(buildDir + imagesDir));
  },
  'build-sounds': function () {
    return gulp.src([srcDir + mediaDir + soundsDir + '/**'])
        .pipe(gulp.dest(buildDir + soundsDir));
  },
};

var watchTasks = {
  'watch-html': function () {
    return gulp.watch([srcDir + '**/*.html'], ['build-html']);
  },
  'watch-js': function () {
    var config = jsxWebpackConfig.getConfig(environment);
    config.watch = true;
    return doWebpack(config);
  },
  'watch-scss': function () {
    return gulp.watch([srcDir + '**/*.scss'], ['build-scss']);
  },
  'watch-images': function () {
    return gulp.watch([srcDir + imagesDir + '/*'], ['build-images']);
  },
  'watch-sounds': function () {
    return gulp.watch([srcDir + mediaDir + soundsDir + '/*'], ['build-sounds']);
  },
};

var serveTasks = {
  'serve': function () {
    connect.server({
      root: buildDir,
      port: servePort,
      livereload: {
        port: 35729,
      },
    });
  },
};

gulp.task('setup-build', utilTasks['setup-build']);

// Build
gulp.task('build-js', buildTasks['build-js']);
gulp.task('build-html', buildTasks['build-html']);
gulp.task('build-scss', buildTasks['build-scss']);
gulp.task('build-images', buildTasks['build-images']);
gulp.task('build-sounds', buildTasks['build-sounds']);

// Watch
gulp.task('watch-js', ['build-js'], watchTasks['watch-js']);
gulp.task('watch-scss', ['build-scss'], watchTasks['watch-scss']);
gulp.task('watch-html', ['build-html'], watchTasks['watch-html']);
gulp.task('watch-images', ['build-images'], watchTasks['watch-images']);
gulp.task('watch-sounds', ['build-sounds'], watchTasks['watch-sounds']);

// Serve
gulp.task('serve', serveTasks['serve']);

// Lint
gulp.task('lint-js', utilTasks['lint-js']);
gulp.task('lint-scss', utilTasks['lint-scss']);

// USE THESE!!
gulp.task('clean', utilTasks.clean);
gulp.task('lint', ['lint-js', 'lint-scss']);
gulp.task('build', ['setup-build', 'build-js', 'build-html', 'build-scss', 'build-images', 'build-sounds']);
gulp.task('watch', ['setup-build', 'serve', 'watch-js', 'watch-scss', 'watch-html', 'watch-images', 'watch-sounds']);
