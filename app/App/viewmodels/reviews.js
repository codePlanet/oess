define(function(require) {
	return {
		viewAttached: function() {
			// Change the selected nav item 
			$('.navItem').removeClass('active');
			$('.reviewNav').addClass('active');
		},
		activate: function(data) {
		}
	};
});
