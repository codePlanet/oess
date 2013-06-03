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
			this.firstName  = ko.observable(data.first_name);
			this.lastName   = ko.observable(data.last_name);
			this.department = ko.observable(data.department);
			this.startTime  = ko.observable(data.start_time);
			this.endTime	= ko.observable(data.end_time);
			this.level		= ko.observable(data.level);
		}
		else {
			this.firstName  = ko.observable();
			this.lastName   = ko.observable();
			this.department = ko.observable();
			this.startTime  = ko.observable(data.start_time);
			this.endTime	= ko.observable(data.end_time);
			this.level		= ko.observable(data.level);
		}
		
		this.fullName = ko.computed(function() {
			return self.firstName() + " " + self.lastName();
		});
		
		this.shortName = ko.computed(function(){
			return self.firstName().substring(0,1) + ". " + self.lastName();
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
			return (51 * Date.parse(self.startTime()).getHours() - 1) + 'px';
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
			return (50 * offset / 1000 / 60 / 60) + 'px';
		});
	}
	
	structures.prototype.Schedule = function(data) {
		var self = this;
		if(data != null) {
			this.firstName  = ko.observable(data.first_name);
			this.lastName   = ko.observable(data.last_name);
			this.department = ko.observable(data.department);
			this.date		= ko.observable(data.date);
			this.startTime  = ko.observable(data.start_time);
			this.endTime	= ko.observable(data.end_time);
			this.level		= ko.observable(data.level);
		}
		else {
			this.firstName  = ko.observable();
			this.lastName   = ko.observable();
			this.department = ko.observable();
			this.date		= ko.observable();
			this.startTime  = ko.observable(data.start_time);
			this.endTime	= ko.observable(data.end_time);
			this.level		= ko.observable(data.level);
		}
		
		this.fullName = ko.computed(function() {
			return self.firstName() + " " + self.lastName();
		});
		
		this.shortName = ko.computed(function(){
			return self.firstName().substring(0,1) + ". " + self.lastName();
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
			return (51 * Date.parse(self.startTime()).getHours() - 1) + 'px';
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
			if(self.endTime() == "12:00 AM")
				offset = Date.parse(self.endTime())  - Date.parse(self.startTime()).addHours(-12);
			var x = (50 * offset / 1000 / 60 / 60);
			x = (x / 50) + x - 2;
			return x + 'px';
		});
	}
	
	return structures;
});