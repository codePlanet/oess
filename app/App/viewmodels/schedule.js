/***************************************************************************************************
 * ViewModel:
 * Author(s):
 * Description: 
 **************************************************************************************************/
define(function(require) { 
	/*********************************************************************************************** 
	 * Includes*
	 **********************************************************************************************/
	var app = require('durandal/app');
	var system = require('durandal/system');			// System logger
	var custom = require('durandal/customBindings');	// Custom bindings
	//var Backend = require('modules/moduleTemplate');	// Module
	var Structures = require('modules/structures');
	var structures = new Structures();
	var Utils = require('modules/utils');
	var utils = new Utils();
	var modal = require('modals/modals');
	var self;
	
	/*********************************************************************************************** 
	 * KO Observables
	 **********************************************************************************************/
	var d = new Date().addMonths(1);
	var scheduleDate = ko.observable(d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear());
	var schedule = ko.observableArray([]);
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
		schedule: schedule,
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
			self = this;
			
			self.schedule([]);
			
			self.employees([
				new structures.Employee({
					first_name: 'Bobby',
					last_name: 'Smith',
					department: "Sales",
					date: '2013-04-09',
					start_time: '10:00:00',
					end_time: '12:00:00',
					level: 0
				}),
				new structures.Employee({
					first_name: 'John',
					last_name: 'Conner',
					department: "Maintenance",
					date: '2013-04-09',
					start_time: '12:00:00',
					end_time: '14:00:00',
					level: 0
				}),
				new structures.Employee({
					first_name: 'Betty',
					last_name: 'Sue',
					department: "Sales",
					date: '2013-04-09',
					start_time: '11:30:00',
					end_time: '14:00:00',
					level: 0
				})
			]);				
		},
		toggleEmployee: function(data, el) {
			// Toggle details
			el = el.currentTarget;
			$(el).parent().next().find('.details').animate({height: 'toggle', opacity: 'toggle'}, 400);
			// Change icon
			var i = $(el).parent().find('i');
			if(i.attr('class').indexOf('icon-plus') >= 0)
				i.removeClass("icon-plus").addClass("icon-minus");
			else
				i.removeClass("icon-minus").addClass("icon-plus");
		},
		addEmployee: function(data) {
			var go = true;
			// Check if employee already added
			var added = _.filter(schedule(), function(item) {
				return item.firstName() == data.firstName() && item.lastName() == data.lastName();
			});
			if(added.length > 0) {
				app.showMessage("That employee is already added on the schedule for this day." +
								"Do you want to add them again?", 
								"Duplicate Schedule", 
								['Yes', 'No'])
				.then(function(result) {
					if(result == "Yes")
						self.showSchedule(data);				
				});
			}
			else {
				self.showSchedule(data);
			}
		},
		showSchedule: function(data) {
			modal.showSchedule(data, "Add Employee").then(function(close) {
				if(close.result == 'Add') {
					// Add employee to schedule
					system.log(data);
					var s = new structures.Schedule({
						first_name: data.firstName(),
						last_name: data.lastName(),
						department: data.department(),
						start_time: data.startTime(),
						end_time: data.endTime(),
						level: 0
					});
					
						// Level
						$.each(schedule(), function(k, v) {
							var overlap = utils.scheduleOverlap(s, v);
							if(overlap && v.level() == s.level()) {
								var level = parseInt(s.level());
								level += 24;
								s.level(level + "px");
							}
						});
						schedule.push(s);	
				}
			});
		},
		activeFormat: function(data, e) {
			e = $(e.currentTarget);
			var parent = e.parent();
			parent.find('li').each(function(k, v) {
				$(v).removeClass();
			});
			e.addClass('active');
		},
		filterEmployees: function(data, e) {
			e = $(e.currentTarget);
			system.log(e.attr('time'));
		}
	};
});