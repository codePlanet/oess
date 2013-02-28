define(['jquery', 'sammy', 'bootstrap', 'knockout'], function($, Sammy, BS, ko) {
    return function appViewModel() {
        var self = this;
        
        self.firstName = ko.observable('Bert');
        self.firstNameCaps = ko.computed(function() {
           return this.firstName().toUpperCase();
        }, self);
        
        // Add jQuery
        self.disappear = function(data, element) {
        	console.log($(element));
        	$(element.srcElement).fadeOut().delay(500).fadeIn();
        };
        
        self.text = "";
        
        // Add Sammy
        self.randomURL = function() {
        	var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        	
        	for (var i = 0; i < 5; i++) {
        		self.text += characters.charAt(Math.floor(Math.random() * characters.length));
        	}
        	
        	location.hash = self.text;
        	self.text = "";
        }
        
        Sammy(function() {
        	this.get('/:name', function() {
        		//alert('The URL is now dev.codeplanetapps.com/spa/#' + this.params.name); 
        	});	
        }).run();
        
        // Typeahead
        $('input').attr('autocomplete', 'off');
        
        $('input').on('keyup', function(e) {
		e.preventDefault();
			$(this).change();
		});
		
		/**********************************************************************************************
		 * UPC typeahead
		 *********************************************************************************************/ 
		var typeahead_opt = {
		    source: function (query, process) {
		        return $.post('php/names.php', { query: query }, function (data) {
		            return process(data);
		       });
		    },
		    items: 5
		};
        
        $('.name').typeahead(typeahead_opt);
        
    };
});
