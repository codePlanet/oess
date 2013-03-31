/**************************************************************************************************
 * Module name:
 * Author(s):
 * Description:
 *
 *************************************************************************************************/
define(function(require) {
	/**************************************************************************************************
	 * Customer Structure
	 * 
	 * Place any structures that you need here. A structure is basically an object that acts like an 
	 * array in that it only has variables. There are no methods. An example of a structure is the
	 * Customer structure below:
	 *  
	 * function Customer(data) {
	 *	this.name  = ko.observable(data.name);
	 *	this.dob   = ko.observable(data.dob.substring(5,7) + '/' 
	 *		+ data.dob.substring(8,10) + '/' + data.dob.substring(0,4));
	 *	this.phone = ko.observable(data.phone);
	 * 	this.email = ko.observable(data.email);
	 * };
	 *************************************************************************************************/
	function utils (parameters) {
		// place attributes here
	}
	
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
	
	return utils;
});