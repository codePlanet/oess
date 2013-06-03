define(function(require) { 
    var router = require('durandal/plugins/router');
	var system = require('durandal/system');  
	var custom = require('durandal/customBindings');

    return {
        router: router,
        // Function that allows DOM manipulation
        viewAttached: function() {
        },
        // Function that is called when view is loaded
        activate: function() {
        	// Tell Durandal where the viewmodels are
            router.mapAuto('viewmodels');
            
            // Set initial view
            return router.activate('schedule');
            
        },
    };
});