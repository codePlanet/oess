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
	
	function utils (parameters) {}
	
	utils.prototype.monthString = function(month) {
		switch(month) {
	 		case 0:  return 'January';
	 		case 1:  return 'February';
	 		case 2:  return 'March';
	 		case 3:  return 'April';
	 		case 4:  return 'May';
	 		case 5:  return 'June';
	 		case 6:  return 'July';
	 		case 7:  return 'August';
	 		case 8:  return 'September';
	 		case 9: return 'October';
	 		case 10: return 'November';
	 		case 11: return 'December';
	 	}
	}
	
	utils.prototype.dayString = function(day) {
		switch(day) {
	 		case 0:  return 'Sunday';
	 		case 1:  return 'Monday';
	 		case 2:  return 'Tuesday';
	 		case 3:  return 'Wednesday';
	 		case 4:  return 'Thursday';
	 		case 5:  return 'Friday';
	 		case 6:  return 'Saturday';
	 	}
	}
	
	utils.prototype.scheduleOverlap = function(e1, e2) {
		var start1 = Date.parse(e1.startTime());
		var end1   = Date.parse(e1.endTime());
		var start2 = Date.parse(e2.startTime());
		var end2   = Date.parse(e2.endTime());
		
		// Adjust for midnight end times
		if(end1.getHours() == 0)
			end1.add(1).days();
		if(end2.getHours() == 0)
			end2.add(1).days();
		
		// Compare times
		if(start1.equals(end2) || start2.equals(end1))
			return false;
		if (start1.between(start2, end2) || start2.between(start1, end1))
			return true;
			
		return false;
	}
	
	utils.prototype.getDBDate = function(date) {
		return Date.parse(date).toString('yyyy-MM-dd');
	}
	
	utils.prototype.getUIDate = function(date) {
		return Date.parse(date).toString('d/M/yyyy');
	}
	
	utils.prototype.getDBTime = function(time) {
		return Date.parse(time).toString('HH:mm:ss');
	}
	
	utils.prototype.getUITime = function(time) {
		return Date.parse(time).toString('h:mm tt');
	}
	
	return utils;
});