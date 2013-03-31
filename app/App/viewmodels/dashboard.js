/***************************************************************************************************
 * ViewModel:
 * Author(s):
 * Description: 
 **************************************************************************************************/
define(function(require) { 
	/*********************************************************************************************** 
	 * Includes*
	 **********************************************************************************************/
	var system = require('durandal/system');			// System logger
	var custom = require('durandal/customBindings');	// Custom bindings
	//var Backend = require('modules/moduleTemplate');	// Module
	
	/*********************************************************************************************** 
	 * KO Observables
	 **********************************************************************************************/
	var schedules = ko.observableArray([]);

	/*********************************************************************************************** 
	 * KO Computed Functions
	 **********************************************************************************************/
	 // var computedFunction = ko.computed(function() {});

	/*********************************************************************************************** 
	 * ViewModel
	 *
	 * For including ko observables and computed functions, add an attribute of the same name.
	 * Ex: observable: observable
	 **********************************************************************************************/
	return {
		/******************************************************************************************* 
		 * Attributes
		 *******************************************************************************************/
		schedules: schedules,
		/******************************************************************************************* 
		 * Methods
		 *******************************************************************************************/
		// This allow manipulation of the DOM
		viewAttached: function() {
			// Change the selected nav item 
			$('.navItem').removeClass('active');
			
		},
		// Loads when view is loaded
		activate: function(data) {
			var self = this;
			
			var s = [
			{name: 'Johnny Smith', start: '8:00 A.M.',  end: '5:00 P.M.', total: 9},
			{name: 'Ashley Merek', start: '9:30 A.M.',  end: '1:00 P.M.', total: 3.5},
			{name: 'Donald Lepzy', start: '10:00 A.M.', end: '6:00 P.M.', total: 8},
			{name: 'Marice Pacci', start: '11:00 A.M.', end: '7:00 P.M.', total: 8}
			];
			
			self.schedules(s);
		}
	};
});