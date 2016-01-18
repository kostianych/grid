define(['myGrid', 'jquery'], function(Grid, $) {
  
    describe('test myGrid module', function() {
        var columnName = 'num';
        var grid = null;

        afterEach(function() {
            grid.destroy();
            grid = null;
        });

        it('test grid render', function() {            
            
            grid = new Grid({
               headers: [{name: columnName, field: 'id'}],
               data: [{id: 2}],
               renderTo: $('body')                
            });
            grid.render();
            
            expect($('th').text()).toEqual(columnName); 
        });   
    

        it('test grid set data', function() {            
            grid = new Grid({
               headers: [{name: columnName, field: 'id'}],               
               renderTo: $('body')                
            });
            grid.setData([{id: 2}]);
            
            expect($('td').text()).toEqual('2'); 
        });   

        it('test grid clear', function() {            
            grid = new Grid({
               headers: [{name: columnName, field: 'id'}],              
               data: [{id: 2}], 
               renderTo: $('body')                
            });
            grid.clear();
            
            expect($('td').text()).toEqual(""); 
            expect($('td').length).toEqual(1); 
        });   

        it('test grid destroy', function() {            
            grid = new Grid({
               headers: [{name: columnName, field: 'id'}],              
               data: [{id: 2}], 
               renderTo: $('body')                
            });
            grid.destroy();
            
            expect($('td').length).toEqual(0); 
        });   


    
    });


});
