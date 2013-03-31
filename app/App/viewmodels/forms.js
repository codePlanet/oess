define(function(require) {
	return {
		viewAttached: function() {
			// Change the selected nav item 
			$('.navItem').removeClass('active');
			$('.formNav').addClass('active');
		},
		activate: function(data) {
		}
	};
});
