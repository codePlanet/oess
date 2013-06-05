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
	var Backend = require('modules/schedule');			// Module
	var backend = new Backend();
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
	var availableHours = ko.observableArray([]);
	var originalEmployees = ko.observableArray([]);
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
		originalEmployees: originalEmployees,
		employees: employees,
		availableHours: availableHours,
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
			// Clear Schedule
			self.schedule([]);
			// Get employees available
			return backend.getEmployees().success(function(data) {
				var emps = $.map(data, function(item) { return new structures.Employee(item) });
				self.employees(emps);
				self.originalEmployees(emps);
			// Get Available Hours
			}).then(function() {
				backend.getAvailableHours().success(function(h) {
					var hours = $.map(h, function(item) { return new structures.AvailableHours(item) });
					self.availableHours(hours);
				});
			// Get Schedules
			}).then(function(){
				backend.getSchedule().success(function(s) {
					var scheds = $.map(s, function(item) { return new structures.Schedule(item) });
					self.schedule(scheds);
				});
			});
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
			// Create new schedule to pass to modal
			var d = new structures.Schedule();
			// Set default values
			d.startTime('12:00 AM');
			d.endTime('12:00 AM');
			d.departmentId(data.departmentId());
			// Call modal
			modal.showSchedule(d, "Add Employee").then(function(close) {
				// Catch department not being entered
				if(d.departmentId() == undefined)
					d.departmentId(data.departmentId());
				// If the user clicked "Add"
				if(close == 'Add') {
					// Add employee to schedule				
					var s = new structures.Schedule({
						first_name: data.firstName(),
						last_name: data.lastName(),
						employee_id: data.id(),
						department_id: d.departmentId(),
						date: utils.getDBDate(self.scheduleDate()),
						start_time: d.startTime(),
						end_time: d.endTime(),
						level: 0
					});
					
					// Convert dates
					s.startTime(utils.getDBTime(s.startTime()));
					s.endTime(utils.getDBTime(s.endTime()));
					
					// Sort schedules by level
					var sorted = _.sortBy(schedule(), function(item) {
						return parseInt(item.level());
					})
					
					// Level
					$.each(sorted, function(k, v) {
						var overlap = utils.scheduleOverlap(s, v);
						if(overlap && v.level() == s.level()) {
							system.log('Increase level!');
							var level = parseInt(s.level());
							level += 24;
							s.level(level + "px");
						}
					});
					
					// Add to database
					backend.saveSchedule(s, 'add');
					
					// Add to Calendar
					schedule.push(s);	
				}
			});
		},
		updateSchedule: function(data) {
			var start = data.startTime();
			var end = data.endTime();
			modal.showSchedule(data, "Update Employee", ["Update", "Delete", "Cancel"]).then(function(close) {
				// If the user clicked "Add"
				if(close == 'Update') {					
					// Convert dates
					data.startTime(utils.getDBTime(data.startTime()));
					data.endTime(utils.getDBTime(data.endTime()));
					
					// Level
					data.level(0);
					// Need to sort list for proper traversal
					var sorted = _.sortBy(schedule(), function(item) {
						return parseInt(item.level());
					});
					// Traverse schedule checking for overlap
					$.each(sorted, function(k, v) {
						var overlap = utils.scheduleOverlap(data, v);
						if(overlap && v.level() == data.level() && v != data) {
							var level = parseInt(data.level());
							level += 24;
							data.level(level + "px");
						}
					});
					
					// Add to database
					backend.saveSchedule(data, 'update');	
				}
				else {
					data.startTime(start);
					data.endTime(end);
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
		// Filter Employee list based on hour clicked
		filterEmployees: function(data, e) {
			// Get Time clicked
			e = $(e.currentTarget);
			var time = parseInt(e.attr('time'));
			// Filter Employee List
			var filtered = _.filter(originalEmployees(), function(item) {
				// Grab id
				var id = item.id();
				// Get hours that match employee
				var hours = _.filter(self.availableHours(), function(item) {
					return id == item.employeeId();
				});
				// Look for match
				var match = false;
				$.each(hours, function(k, v) {				
					// Get start and end times for employee
					var start = parseInt(v.startTime());
					var end = parseInt(v.endTime());
					end = end == 0 ? 24 : end;
					
					// Check if the time is inbetween start and end
					if(start <= time && time < end)
						match = true;
				});
				return match;
			});
			self.employees(filtered);
		},
		resetEmployees: function() {
			self.employees(self.originalEmployees());
		}
	};
});