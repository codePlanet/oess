define(function(require) {
	return {
		viewAttached: function() {
			// Change the selected nav item 
			$('.navItem').removeClass('active');
			$('.employeeNav').addClass('active');
		},
		activate: function(data) {
		}
	};
});
