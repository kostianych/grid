require.config({
    
    baseUrl: '/',
    
    paths: {
        // Third-party 
        jquery: 'bower_components/jquery/dist/jquery',
        mustache: 'bower_components/mustache/mustache',
        bootstrap: 'bower_components/bootstrap/bootstrap',
        text: 'bower_components/requirejs-text/text',  
        observejs: 'bower_components/observe-js/src/observe',      
        // Custom
        myGrid: 'grid/grid'
        
    },

    shim: {
        'bootstrap': {
            deps: ['jquery'],
            exports: 'Bootstrap'
        }
    }

 });

define(['jquery', 'observejs', 'myGrid'], function($, observe, Grid) {

    $(document).ready( function() {

        var pomodorosTemplate = '{{#model}}<img class="pomodoro-image" src="images/pomodoro_{{state}}.png"/>{{/model}}';

        var actionTemplate = '<a class="delete" href="#">Delete</a>';        


        $.get("data.json", function(data) {

        }).done(function(data) {
            
            var grid = new Grid({
                renderTo: $('body'),
                headers: [{name: 'Task', style: 'pomodoro-table-task-column', field: 'name'}, 
                          {name: 'Pomodoros', cellTemplate: pomodorosTemplate, field:  'pomodoros'}, 
                          {name: 'Action', cellTemplate: actionTemplate}],
                data: data
            })
            grid.render();

            var initDeleteLink = function() {
                var deleteLink = $('body').find('.delete');

                deleteLink.click(function(e) {
                    var clickedElIndex = $('body').find('.delete').index($(this));
                    data.splice(clickedElIndex, 1);

                });

            };

            initDeleteLink();

            var observer = new ArrayObserver(data);
            
            observer.open(function(splices) {

                splices.forEach(function(splice) {
                    grid.setData(data);
                    initDeleteLink();
                });

            });
        
        });

 

        

        
    }); 

});