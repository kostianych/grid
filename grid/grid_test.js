define(['myGrid', 'jquery'], function(Grid, $) {
  
    describe('test myGrid module', function() {

        it('test grid render', function() {
            var columnName = 'num;'
            
            var grid = new Grid({
               headers: [{name: columnName, field: 'id'}],
               data: [{id: 2}],
               renderTo: $('body')                
            });
            grid.render();
            
            expect($('th').text()).toEqual(columnName); 
        });   
    });

});
