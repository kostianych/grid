/**
 * Module contains grid component 
 *
 * @module grid 
 *
 */
define(["jquery", "mustache", 'text!grid/templates/grid.html', 'text!grid/templates/row.html', 'text!grid/templates/cell.html'], 
	function($, Mustache, template, rowTemplate, cellTemplate) {

	/**
	 * Represents grid component
	 *
	 * @class
	 *
	 * @param {Object}   config - component`s configuration object.	 
	 * @param {Object}   config.renderTo - render to this element (jquery)
	 * @param {Object[]} config.headers - grid headers.	 
	 * @param {string}   config.headers.name - displayed column name
	 * @param {string}   config.headers.cellTemplate - template for cells of column
	 * @param {string}   config.headers.field - name of field from data object (key in row object)
	 * @param {Object[]} config.data - array of records (key - field name, value - cell value)
	 */
	function Grid(config) {

		var me = this;		
		this.config = config;

		this._nullRecord = {};
		$.each(me.config.headers, function(key, headerObj) {
			me._nullRecord[headerObj.field] = null;			
		})
		 
		if (!this.config.data) {
			this.config.data = [this._nullRecord];
		}

			
		var rowModel = {
			
			row: null,

			headers: me.config.headers,
			// Transform object to values array (mustache can`t print objects)
			values: function() {
				var valuesArray = [];
				var key;	
				for(key in row) {
					if (isHeaderExists(key)) {
			    		valuesArray.push(row[key]);
			    	}
				}
				return valuesArray;				
			}, 

			isHeaderExists: function(header) {
				var result = false;
				$.each(this.headers, function(key, headerObj) {
					result = headerObj.field == header;
					return !result;
				});
				return result;
			},

			
			isEmpty: function() {
				return this.row == me._nullRecord;
			},

			printCells: function() {
				// header object is scope here
				var header = this;
				var cellValue = rowModel.row[header.field];

				if (header.cellTemplate && !rowModel.isEmpty()) {
					return '<td>' + Mustache.render(header.cellTemplate, {model: cellValue}) + '</td>';
				} else {
					return Mustache.render(cellTemplate, {value: cellValue});
				}
			},		


		};

		this.config.printRow = function () {		
			// row object is scope here	
			rowModel.row = this;
			return Mustache.render(rowTemplate, rowModel);			
		};

	};	

	Grid.prototype = {

		ACTIVE_CLASS: 'active',

		ROWS_LOCATOR: 'tbody > tr',
		ROW_LOCATOR: 'tr#',

		_nullRecord: null,

		_activeRow: null,

		_disabled: null,

		/**
		 * Render component to element config.renderTo
		 *
		 * @public
		 */
		render: function() {
			var html = Mustache.render(template, this.config); 
			this.el = $(html);
			this.el.appendTo(this.config.renderTo);			
			
			this._getRows().click($.proxy(this._onRowClick, this));
			
			if (!this._activeRow) {
				this._activeRow = this._getRows()[0];
			}
			if (this._activeRow && this._activeRow.id) {
				this.el.find(this.ROW_LOCATOR + this._activeRow.id).addClass(this.ACTIVE_CLASS);
			}
		},

		/**
		 * Disable component
		 *
		 * @public
		 */
		setDisabled: function(disabled) {
			this._disabled = disabled;
		},

		/**
		 * Remove all grid records
		 *
		 * @public
		 */
		clear: function() {
			this.config.data = [this._nullRecord];
			this.rerender();
		},

		/**
		 * Set records to be displayed
		 *
		 * @param {Object[]} data - array of records (key - field name, value - cell value)
		 *
		 * @public
		 */
		setData: function(data) {
			if (data.length == 0) {
				this.config.data = [this._nullRecord];
			} else {
				this.config.data = data;
			}
			this._rerender();
		},

		_getRows: function() {
			return this.el.find(this.ROWS_LOCATOR);
		},

		_onRowClick: function(e) {
			if (this._disabled) {
				return;
			}
			
			if (this._activeRow) {
				$(this._activeRow).removeClass(this.ACTIVE_CLASS);
			}
			var tdEl = e.target;
			var trEl = $(tdEl.parentNode);
			trEl.addClass(this.ACTIVE_CLASS);	

			this._activeRow = row[0];
		},

		_rerender: function() {
			this.el.remove();
			this._activeRow = null;
			this.render();
		},

	};

	return Grid;

});