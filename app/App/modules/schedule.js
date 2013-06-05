/**************************************************************************************************
 * Module name: Schedule
 * Author(s): Sean Malone
 * Description: This module handles data for the Scheduling ViewModel/View.
 *
 *************************************************************************************************/
define(function(require) {
	var system = require('durandal/system');
	var self;
	
	/**************************************************************************************************
	 * Constructor
	 *************************************************************************************************/
	var schedule = function() {
		self = this;
	};
	
	/**********************************************************************************************
	 * Get Methods
	 *********************************************************************************************/
	// Get Employees
	schedule.prototype.getEmployees = function(dept) {
		return self.query({
			mode: 'select',
			table: 'employee',
			fields: ['employee.id', 'first_name', 'last_name', 'position', 'department_id', 'department'],
			join: 'JOIN department on department_id=department.id'			
		});
	}
	
	// Get Schedule
	schedule.prototype.getSchedule = function(dept) {
		var fields = ['schedule.id', 'first_name', 'last_name', 'employee_id', 'schedule.department_id', 
				     'date', 'start_time', 'end_time', 'level'];
		
		return self.query({
			mode: 'select',
			table: 'schedule',
			fields: fields,
			join: 'JOIN department on department_id=department.id' +
			       ' JOIN employee on employee_id=employee.id'			
		});
	}
	
	// Get Departments
	schedule.prototype.getDepartments = function() {
		return self.query({
			mode: 'select',
			table: 'department',
			fields: '*'
		});
	}
	
	// Get Available Hours
	schedule.prototype.getAvailableHours = function() {
		return self.query({
			mode: 'select',
			table: 'available_hours',
			fields: '*'
		});
	}
	
	/**************************************************************************************************
	 * Save Methods
	*************************************************************************************************/
	schedule.prototype.saveSchedule = function(schedule, method) {
		var fields = [];
		var values = [];
		$.each(schedule, function(k, v) {
			if(k == 'id' || k == 'departmentId' || k == 'employeeId' || k == 'date'
			|| k == 'startTime' || k == 'endTime' || k == 'level') {
			   	fields.push(k.replace(/([A-Z])/g, function($1){return "_"+$1.toLowerCase();}));
				values.push(v());
			}
		});
		
		if(method == 'add' || schedule.id() == undefined) {
			self.query({
				mode: 'select',
				table: 'schedule',
				fields: 'id',
				order: 'ORDER BY id DESC',
				limit: 'LIMIT 1'
			}).success(function(data) {
				system.log(data);
				var id = 1;
				if(data.length > 0)
					id = parseInt(data[0].id) + 1;
				values[0] = id;
				schedule.id(id);
				
				return self.query({
					mode: 'insert',
					table: 'schedule',
					fields: fields,
					values: values
				});
			});
		}
		else {
			return self.query({
				mode: 'update',
				table: 'schedule',
				fields: fields,
				values: values,
				where: "WHERE id='" + schedule.id() + "'"
			});
		}
		
	}
	
	/**********************************************************************************************
	 * Query
	 * 
	 * This method is used by all other methods to execute the ajax call.
	 *********************************************************************************************/ 
	schedule.prototype.query = function(data) {
		return $.getJSON('php/query.php',data);
	}
	 
	/**************************************************************************************************
	 * Return class so it is usable.
	 *************************************************************************************************/
	return schedule;
});