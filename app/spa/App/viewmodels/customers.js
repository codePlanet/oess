define(function(require) { 
	// Load System for debugging
	var system = require('durandal/system');
	var custom = require('durandal/customBindings');
	var Backend = require('modules/customers');
	
	// Customer Structure
	function Customer(data) {
		this.name  = ko.observable(data.name);
		this.dob   = ko.observable(data.dob.substring(5,7) + '/' 
			+ data.dob.substring(8,10) + '/' + data.dob.substring(0,4));
		this.phone = ko.observable(data.phone);
		this.email = ko.observable(data.email);
	};
	
	// Form observables
	var inputName  = ko.observable('');
	var inputDOB   = ko.observable('');
	var inputPhone = ko.observable('');
	var inputEmail = ko.observable('');
	// Customers array
	var customers = ko.observableArray([]);

	/************************************************************************************************** 
	 * This is the Durandal object being returned. In order to get the ko obervables to work properly, 
	 * we need to create them outside of the return statement. Then we create an object in the return
	 * statement with the same name and assign the ko observable
	 *************************************************************************************************/
	return {
		inputName: inputName,
		inputDOB: inputDOB,
		inputPhone: inputPhone,
		inputEmail: inputEmail,
		customers: customers,
		submitCustomer: function() {
			var self = this;
			// Fields in table
			var fields = ['name', 'dob', 'phone', 'email'];
			// Parse Date
			var date = self.inputDOB().substring(6,10) + '-' + self.inputDOB().substring(0,2) + '-' 
				+ self.inputDOB().substring(3,5);
			// Create array of values to send to query.php 
			var customer = [self.inputName(), date, self.inputPhone(), self.inputEmail()];
			// Send data to query.php
			var backend = new Backend();
			
			// Submit Customer
			backend.submitCustomer(customer, date, fields).then(function(data) {
			});
			
			// Add to table
			self.customers.push(new Customer({
				name: self.inputName(), 
				dob: date, 
				phone: self.inputPhone(), 
				email: self.inputEmail()
			}));
		},
		removeCustomer: function(customer) {
			var self = this;
			
			// Fields in table
			var fields = ['name', 'dob', 'phone', 'email'];
			// Parse Date
			var date = customer.dob().substring(6,10) + '-' + customer.dob().substring(0,2) 
				+ '-' + customer.dob().substring(3,5);
			// Convert object to array
			var cust = [customer.name(), date, customer.phone(), customer.email()];
			// Send request to query.php
			var backend = new Backend();
			
			backend.removeCustomer(cust, date, fields);
			// Delete customer from customers
			customers.remove(customer); 		
		},
		// This allows us to add jQuery as usual
		viewAttached: function() {
			// Change the selected nav item 
			$('.customerNav').addClass('active');
			$('.firstNav').removeClass('active');
			$('.secondNav').removeClass('active');
			$('.patientNav').removeClass('active');
		},
		// This performs any needed functionality after the page loads
		activate: function(data) {
			// Capture the module instance
			var self = this;
			
			var backend = new Backend();
			// Get current customers from database and add to customers observableArray
			var jsonCall = backend.getCustomers(self.customers);
			
			return jsonCall;
		}
	};
});