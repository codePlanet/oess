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
	var schedules = ko.observableArray([]);
	var employees = ko.observableArray([]);

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
		schedules: schedules,
		employees: employees,
		/******************************************************************************************* 
		 * Methods
		 *******************************************************************************************/
		// This allow manipulation of the DOM
		viewAttached: function() {
			// Change the selected nav item 
			$('.navItem').removeClass('active');
			$('.scheduleNav').addClass('active');
			
			var windowHeight = parseInt($(window).height());
			var headerHeight = parseInt($('.mainNav').height()) + parseInt($('.sub-nav').height());
			var totalHeight = windowHeight - headerHeight;
			$('.employeeList').height(totalHeight - 2);
		},
		// Loads when view is loaded
		activate: function(data) {
			var self = this;
			
			self.employees([
				{
					fullName: 'Bobby Smith',
					department: 'Sales'
				},
				{
					fullName: 'John Conner',
					department: 'Maintenance'
				}
			]);
			
			self.schedules([
				{
					employees: ko.observableArray([
						{
							name: 'Bobby Smith',
							start: ko.observable('10:00'),
							startOffset: ko.observable('500px'),
							end: ko.observable('12:00'),
							endOffset: ko.observable('100px')
						},
						{
							name: 'John Conner',
							start: ko.observable('11:00'),
							startOffset: ko.observable('550px'),
							end: ko.observable('14:00'),
							endOffset: ko.observable('150px')
						}
					])
				},
				{
					employees: ko.observableArray([])
				}
			]);
		},
		toggleEmployee: function(data, el) {
			el = el.currentTarget;
			$(el).next().slideToggle(300);
		}
	};
});