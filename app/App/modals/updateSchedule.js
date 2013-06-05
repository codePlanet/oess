define(function(require) {
	var system = require('durandal/system');
	var Utils = require('modules/utils');
	var utils = new Utils();
	var Structures = require('modules/structures');
	var structures = new Structures();
	var Backend = require('modules/schedule');
	var backend = new Backend();
	var self;
	
	/**********************************************************************************************
	 * Constructor
	 *********************************************************************************************/
	var Modal = function(schedule, title, options) {
		self = this;								
		this.schedule = schedule;
		this.schedule.startTime(utils.getUITime(Date.parse(this.schedule.startTime())));
		this.schedule.endTime(utils.getUITime(Date.parse(this.schedule.endTime())));	
		this.title = title || Order.defaultTitle;
		this.options = options || Order.defaultOptions;
		this.departments = ko.observableArray([]);
		this.getDepartments();
	};
	
	/**********************************************************************************************
	 * Select Option
	 * 
	 * This method is called when the user clicks one of the buttons in the modal.
	 *********************************************************************************************/
	Modal.prototype.selectOption = function(dialogResult) {
		// Close modal		
		this.modal.close(dialogResult);
	};
	
	Modal.prototype.getDepartments  = function() {
		backend.getDepartments().success(function(data) {
			self.departments(data);
		});
	}
	
	Modal.defaultTitle = '';
	Modal.defaultOptions = ['Add', 'Cancel'];
	
	return Modal;	
});
