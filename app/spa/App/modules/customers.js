define(function(require) {
	/**************************************************************************************************
	 * Customer Structure
	 *************************************************************************************************/
	function Customer(data) {
		this.name  = ko.observable(data.name);
		this.dob   = ko.observable(data.dob.substring(5,7) + '/' 
			+ data.dob.substring(8,10) + '/' + data.dob.substring(0,4));
		this.phone = ko.observable(data.phone);
		this.email = ko.observable(data.email);
	};
	
	var backend = function() {};
	
	/**************************************************************************************************
	 * Get Customers
	 *************************************************************************************************/
	backend.prototype.getCustomers = function(customers) {
		$.getJSON(
			// Backend script
			'php/query.php', 
			// Variables sent to query.php
			{
				mode: 'select', 
				table: 'customers', 
				'fields[]': '*', 
				'values[]': '*'
			}, 
			// Callback function
			function(data) {
				var customer = $.map(data, function(item) { return new Customer(item) });
				customers(customer);
			}
		);
	};
	
	/**************************************************************************************************
	 * Add Customers
	 *************************************************************************************************/
	backend.prototype.submitCustomer = function(customer, date, fields) {
		return $.get('php/query.php', {mode: 'insert', table: 'customers', 'fields[]': fields, 'values[]': customer});
	};
	
	/**************************************************************************************************
	 * Remove Customers
	 *************************************************************************************************/
	backend.prototype.removeCustomer = function(customer, date, fields) {
		$.get('php/query.php', {mode: 'delete', table: 'customers', 'fields[]': fields, 'values[]': customer});	
	};
	
	return backend;
});