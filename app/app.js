define(['jquery', 'observejs', 'myGrid', 'text!app/templates/pomodoros.html','text!app/templates/action.html', 'css!app/app'], 
    function($, observe, Grid, pomodorosTemplate, actionTemplate) {

    $(document).ready( function() {


        $.get("data.json").done(function(data) {
            
            var grid = new Grid({
                renderTo: $('body'),
                headers: [{name: 'Task', style: 'pomodoro-table-task-column', field: 'name'}, 
                          {name: 'Pomodoros', cellTemplate: pomodorosTemplate, field:  'pomodoros'}, 
                          {name: 'Action', cellTemplate: actionTemplate}],
                data: data,
                cls: 'pomodoro-table'
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