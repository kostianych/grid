define(['myGrid', 'jquery'], function(Grid, $) {
  
    describe('test myGrid module', function() {
        var columnName = 'num';
        var grid = null;

        beforeEach(function() {
            grid = new Grid({
               headers: [{name: columnName, field: 'id'}],
               data: [{id: 2}],
               renderTo: $('body')                
            });
        });

        afterEach(function() {
            grid.destroy();
            grid = null;
        });

        it('test grid render', function() {                    
            grid.render();
            
            expect($('th').text()).toEqual(columnName); 
        });   
    

        it('test grid set data', function() {
            grid.setData([{id: 2}]);
            
            expect($('td').text()).toEqual('2'); 
        });   

        it('test grid clear', function() {
            grid.clear();
            
            expect($('td').text()).toEqual(""); 
            expect($('td').length).toEqual(1); 
        });   

        it('test grid destroy', function() {
            grid.destroy();
            
            expect($('td').length).toEqual(0); 
        });   


    
    });


});
