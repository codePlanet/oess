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
	 		case 1:  return 'January';
	 		case 2:  return 'February';
	 		case 3:  return 'March';
	 		case 4:  return 'April';
	 		case 5:  return 'May';
	 		case 6:  return 'June';
	 		case 7:  return 'July';
	 		case 8:  return 'August';
	 		case 9:  return 'September';
	 		case 20: return 'October';
	 		case 11: return 'November';
	 		case 12: return 'December';
	 	}
	}
	
	utils.prototype.dayString = function(month) {
		switch(month) {
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