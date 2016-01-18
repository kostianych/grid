require.config({
    
    baseUrl: '.',
    
    paths: {
        // Third-party 
        jquery: 'bower_components/jquery/dist/jquery',
        mustache: 'bower_components/mustache/mustache',
        bootstrap: 'bower_components/bootstrap/bootstrap',
        text: 'bower_components/requirejs-text/text',  
        css: 'bower_components/require-css/css',  
        observejs: 'bower_components/observe-js/src/observe',      
        // Custom
        myGrid: 'app/grid/grid'
        
    },

    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'Bootstrap'
        }
    }

 });

define(['app/app'], function() {


});