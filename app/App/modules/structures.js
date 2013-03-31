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
	function structures (parameters) {
		// place attributes here
	}
	
	structures.prototype.Employee = function(data) {
		var self = this;
		if(data != null) {
			this.firstName  = ko.observable(data.first_name);
			this.lastName   = ko.observable(data.last_name);
			this.department = ko.observable(data.department);
		}
		else {
			this.firstName  = ko.observable();
			this.lastName   = ko.observable();
			this.department = ko.observable();
		}
		
		this.fullName = ko.computed(function() {
			return self.firstName() + " " + self.lastName();
		});
	}
	
	return structures;
});