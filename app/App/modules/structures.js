/**************************************************************************************************
 * Module name:
 * Author(s):
 * Description:
 *
 *************************************************************************************************/
define(function(require) {
	/**************************************************************************************************
	 * Includes
	 *************************************************************************************************/
	var system = require('durandal/system');
	
	function structures (parameters) {
		// place attributes here
	}
	
	structures.prototype.Employee = function(data) {
		var self = this;
		if(data != null) {
			this.id			  	= ko.observable(data.id);
			this.firstName  	= ko.observable(data.first_name);
			this.lastName   	= ko.observable(data.last_name);
			this.position		= ko.observable(data.position);
			this.departmentId 	= ko.observable(data.department_id);
			this.department 	= ko.observable(data.department);
		}
		else {
			this.id				= ko.observable();
			this.firstName  	= ko.observable();
			this.lastName   	= ko.observable();
			this.position		= ko.observable();
			this.departmentId 	= ko.observable();
			this.department 	= ko.observable();
		}
		
		this.fullName = ko.computed(function() {
			return self.firstName() + " " + self.lastName();
		});
		
		this.shortName = ko.computed(function() {
			return self.firstName().substring(0,1) + ". " + self.lastName();
		});
	}
	
	structures.prototype.Schedule = function(data) {
		var self = this;
		if(data != null) {
			this.id				= ko.observable(data.id);
			this.firstName  	= ko.observable(data.first_name);
			this.lastName   	= ko.observable(data.last_name);
			this.employeeId		= ko.observable(data.employee_id);
			this.departmentId 	= ko.observable(data.department_id);
			this.date			= ko.observable(data.date);
			this.startTime  	= ko.observable(data.start_time);
			this.endTime		= ko.observable(data.end_time);
			this.level			= ko.observable(data.level);
		}
		else {
			this.id				= ko.observable();
			this.firstName  	= ko.observable();
			this.lastName   	= ko.observable();
			this.employeeId		= ko.observable();
			this.departmentId 	= ko.observable();
			this.date			= ko.observable();
			this.startTime  	= ko.observable(Date.parse('today'));
			this.endTime		= ko.observable(Date.parse('today'));
			this.level			= ko.observable(0);
		}
		
		this.fullName = ko.computed(function() {
			return self.firstName() + " " + self.lastName();
		});
		
		this.shortName = ko.computed(function() {
			if(self.firstName() != undefined && self.lastName() != undefined)
				return self.firstName().substring(0,1) + ". " + self.lastName();
			else
				return '';
		})
		
		this.start = ko.computed(function() {
			var start = Date.parse(self.startTime());
			var noon = Date.parse(self.startTime()).set({hour: 12, minute: 0});
			var min = '';
			// Minutes
			if(start.getMinutes() == 0)
				min = '00';
			else if(start.getMinutes() < 10)
				min = '0' + start.getMinutes();
			else
				min = start.getMinutes();
			// Change to starndard time	
			if(start >= noon) {
				start.addHours(-12);
				start = start.getHours() + ":" + min + " PM";
			}
			else
				start = start.getHours() + ":" + min + " AM";
			return start;
		});
		
		this.startOffset = ko.computed(function() {
			var offset = Date.parse(self.startTime()).getHours() - 1;
			offset += Date.parse(self.startTime()).getMinutes() / 60 + 1;
			offset = 50 * offset + offset - 1 + 'px';
			return offset;
		});
		
		this.end = ko.computed(function() {
			var end = Date.parse(self.endTime());
			var noon = Date.parse(self.endTime()).set({hour: 12, minute: 0});
			var min = '';
			// Minutes
			if(end.getMinutes() == 0)
				min = '00';
			else if(end.getMinutes() < 10)
				min = '0' + end.getMinutes();
			else
				min = end.getMinutes();
			// Change to standard time	
			if(end >= noon) {
				if(end.getHours() != 12)
					end.addHours(-12);
				end = end.getHours() + ":" + min + " PM";
			}
			else
				end = end.getHours() + ":" + min + " AM";
			return end;
		});
		
		this.endOffset = ko.computed(function() {
			var offset = Date.parse(self.endTime()) - Date.parse(self.startTime());

			if(self.endTime() == "12:00 AM" || self.endTime() == '00:00:00')
				offset = Date.parse(self.endTime())  - Date.parse(self.startTime()).addHours(-24);
			offset = offset / 1000 / 60 / 60;
			var x = 50 * offset + offset - 2;
			return x + 'px';
		});
	}
	
	// Available Hours
	structures.prototype.AvailableHours = function(data) {
		var self = this;
		if(data != null) {
			self.id 		= ko.observable(data.id);
			self.employeeId = ko.observable(data.employee_id);
			self.day 		= ko.observable(data.day);
			self.startTime 	= ko.observable(data.start_time);
			self.endTime 	= ko.observable(data.end_time);
			self.notes 		= ko.observable(data.notes);
		}
		else {
			self.id 		= ko.observable();
			self.employeeId = ko.observable();
			self.day 		= ko.observable();
			self.startTime 	= ko.observable();
			self.endTime 	= ko.observable();
			self.notes 		= ko.observable();
		}
	}
	
	return structures;
});