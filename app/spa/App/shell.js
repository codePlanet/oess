define(function(require) { 
    var router = require('durandal/plugins/router');
	var system = require('durandal/system');  
	var custom = require('durandal/customBindings');

    return {
        router: router,
        viewAttached: function() {
	        function reSize () {
            	var windowHeight = $(window).height();
            	var windowWidth = $(window).width();
            	var navHeight = parseInt($('.mainNav').height());
            	var viewHolder = $('.viewHolder');
            	
        		viewHolder.height(parseInt(windowHeight - navHeight));
            	viewHolder.width(parseInt(windowWidth));
            };
            
            $('.viewHolder').ready(function() {
            	reSize();
            });
            
            $(window).resize(function() {
            	reSize();
            });
        },
        activate: function() {
            router.mapAuto('viewmodels');
            return router.activate('first');
            
        },
        // This causes the submenu to appear when the main icon is hovered
        subMenuIn: function(element, event) {
        	// Get the class name for the element to toggle
        	var len = event.currentTarget.classList.length - 1;
	        var cl =  event.currentTarget.classList[0].replace('Nav','');
	        // Hide all other submenus
	        $('.hoverNav').slideUp();
	        // Show submenu
	        $('.' + cl).slideDown();
        },
        // This causes the submenu to disappear when the main icon is no longer hovered
        subMenuOut: function(element, event) {
        	// Get the class name for the element to toggle
        	var len = event.currentTarget.classList.length - 1;
	        var cl =  '.' + event.currentTarget.classList[0].replace('Nav','');
	        
	        // If the submenu is hovered, break the toggle animation,
	        // Else hide the submenu
	        $(cl).hover(
	        function(e) {
	        	$(cl).stop(true);
	        },
	        function(e) {
	        	$(cl).slideUp(400, function() {
	        		$(cl).stop(true);
	        	});
	        });
	        
	        $(cl).slideUp();    
        }
    };
});