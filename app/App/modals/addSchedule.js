define(function(require) {
	var system = require('durandal/system');
	var Structures = require('modules/structures');
	var structures = new Structures();
	var self;
	
	/**********************************************************************************************
	 * Constructor
	 *********************************************************************************************/
	var Order = function(employee, title, options) {
		self = this;								
		this.employee = employee;	
		this.title = title || Order.defaultTitle;
		this.options = options || Order.defaultOptions;
	};
	
	/**********************************************************************************************
	 * Select Option
	 * 
	 * This method is called when the user clicks one of the buttons in the modal.
	 *********************************************************************************************/
	Order.prototype.selectOption = function(dialogResult) {
		// Close modal		
		this.modal.close({schedule: "test", result: dialogResult});
	};
	
	Order.defaultTitle = '';
	Order.defaultOptions = ['Add', 'Cancel'];
	
	return Order;	
});
