define(function(require) {
	return {
		viewAttached: function() {
			// Change the selected nav item 
			$('.navItem').removeClass('active');
			$('.swapNav').addClass('active');
		},
		activate: function(data) {
		}
	};
});
