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

// New stuff
var srcDir = './src';
var buildDir = './build';
var imagesDir = '/images';

var htmlEntry = 'index.html';
var htmlEntryFull = srcDir + htmlEntry;
var htmlArtifact = 'index.html';
var htmlArtifactFull = buildDir + htmlArtifact;

var jsxEntry = 'entrypoint.jsx';
var jsxEntryFull = srcDir + jsxEntry;
var jsxArtifact = 'bundle.js';
var jsxArtifactFull = buildDir + jsxArtifact;
var jsxWebpackConfig = generateWebpackConfig(jsxEntryFull, jsxArtifactFull);

var scssEntry = 'entrypoint.scss';
var scssEntryFull = srcDir + scssEntry;
var scssArtifact = 'app.css';

// SOon I won't need this
var webpackConfig = generateWebpackConfig(srcDir + mainEntry, artifactName);


function doWebpack(config) {
  return gulp.src(config.entry)
      .pipe(webpackStream(config))
      .pipe(environment === 'production' ? uglify() : util.noop())
      .pipe(gulp.dest(buildDir))
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
    );
  },
  'clean': function () {
    rmIfExists(buildDir);
  },
  'lint-jsx': function () {
    return gulp.src(['src/**/*.{js,jsx}', '!node_modules/**'])
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
        .pipe(gulp.dest(htmlArtifactFull));
  },
  'build-jsx': function () {
    return doWebpack(jsxWebpackConfig.getConfig(environment));
  },
  'build-scss': function () {
    return gulp.src(scssEntryFull)
        .pipe(sass().on('error', sass.logError))
        .pipe(rename(scssArtifact))
        .pipe(gulp.dest(buildDir))
        .pipe(size({title: 'css'}))
        ;
  },
  'build-images': function () {
    return gulp.src([srcDir + imagesDir + '/*'])
        .pipe(rename({dirname: ''}))
        .pipe(gulp.dest(buildDir + imagesDir));
  },
};

var watchTasks = {
  'watch-html': function () {
    return gulp.watch([srcDir + '**/*.html'], ['build-html']);
  },
  'watch-jsx': function () {
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
};

gulp.task('setup-build', utilTasks['setup-build']);

// Build
gulp.task('build-jsx', buildTasks['build-jsx']);
gulp.task('build-html', buildTasks['build-html']);
gulp.task('build-scss', buildTasks['build-scss']);
gulp.task('build-images', buildTasks['build-images']);

// Watch
gulp.task('watch-jsx', watchTasks['watch-jsx']);
gulp.task('watch-scss', watchTasks['watch-js']);
gulp.task('watch-html', watchTasks['watch-html']);
gulp.task('watch-images', watchTasks['watch-images']);

// Lint
gulp.task('lint-jsx', utilTasks['lint-jsx']);
gulp.task('lint-scss', utilTasks['lint-scss']);
gulp.task('lint', ['lint-js', 'lint-scss']);

// USE THESE!!
gulp.task('clean', utilTasks.clean);
gulp.task('build', ['setup-build', 'build-jsx', 'build-html', 'build-scss', 'build-images']);
gulp.task('watch', ['setup-build', 'watch-jsx', 'watch-scss', 'watch-html', 'watch-images']);
