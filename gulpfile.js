var fs = require('fs');
var browserify = require('browserify');
var watchify = require('watchify');

var b = browserify({
  entries: ['src/main.js'],
  cache: {},
  packageCache: {},
  plugin: [watchify]
});

b.on('update', bundle);
bundle();

function bundle() {
  b.bundle().pipe(fs.createWriteStream('output.js'));
}


