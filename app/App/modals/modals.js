define(function(require) {
	var modalDialog = require('durandal/modalDialog');
	var Schedule = require('./addSchedule');
	
	return {
		showSchedule: function(employee, title, options) {
			return modalDialog.show(new Schedule(employee, title, options));
		}
	};
});