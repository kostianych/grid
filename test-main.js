var allTestFiles = [];
var TEST_REGEXP = /(spec|test)\.js$/i;

var pathToModule = function(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

Object.keys(window.__karma__.files).forEach(function(file) {
  if (TEST_REGEXP.test(file)) {
    // Normalize paths to RequireJS module names.
    allTestFiles.push(pathToModule(file));
  }
});

require.config({
  // Karma serves files under /base, which is the basePath from your config file
  baseUrl: '/base',

  // dynamically load all test files
  deps: allTestFiles,

  // we have to kickoff jasmine, as it is asynchronous
  callback: window.__karma__.start,

    paths: {      
      "jquery": "bower_components/jquery/dist/jquery",
      "bootstrap": "bower_components/bootstrap/dist/js/bootstrap",
      "mustache": "bower_components/mustache/mustache",
      "text": "bower_components/requirejs-text/text",
      "css": 'bower_components/require-css/css',
      "observejs": "bower_components/observe-js/src/observe",      
      // Custom
      "myGrid": "app/grid/grid"      
    }

});
