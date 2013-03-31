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
	var Utils = require('modules/utils');
	var utils = new Utils();
	
	/*********************************************************************************************** 
	 * KO Observables
	 **********************************************************************************************/
	var scheduleDate = ko.observable();

	/*********************************************************************************************** 
	 * KO Computed Functions
	 **********************************************************************************************/
	var formattedDate = ko.computed(function() {
		var date = scheduleDate();
		if(date == undefined)
			date = new Date();
		else
			date = new Date(scheduleDate());
		
		var day = utils.dayString(date.getDay());
		var month = utils.monthString(date.getMonth());
		var date = date.getDate();
		return day + ", " + month + " " + date;
	});

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
		scheduleDate: scheduleDate,
		formattedDate: formattedDate,
		/******************************************************************************************* 
		 * Methods
		 *******************************************************************************************/
		// This allow manipulation of the DOM
		viewAttached: function() {
			// Change the selected nav item 
			$('.navItem').removeClass('active');
			$('.scheduleNav').addClass('active');
		},
		// Loads when view is loaded
		activate: function(data) {
			// Code here
			
			// If you add any asynchronous code, make sure you return it. If you need to add multiple
			// asynchronous code, return the functions chained together. If you don't return them,
			// then Durandal will not wait for them to finish before loading the rest of the page.
			// There might be issues when updating observables.
			// Ex:
			// return .get().getJSON().post();
		}
	};
});