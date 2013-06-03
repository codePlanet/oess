define(function(require) {
	var system = require('./system');
	
	// Datepicker
	ko.bindingHandlers.datepicker = {
		init: function(element, valueAccessor) {
			var value = valueAccessor(); 
			
			$(element).datepicker();
			for(var key in value) {
				$(element).datepicker("option", key, value[key]);
			}
		}	
	};
	
	// Timepicker
	ko.bindingHandlers.timepicker = {
		init: function(element, valueAccessor) {
			var value = valueAccessor(); 
			
			var options = {};
			for(var key in value) {
				options[key] = value[key];
			}
			
			$(element).timepicker(options);
		}	
	};
});