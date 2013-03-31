define(function(require) {
	return {
		viewAttached: function() {
			// Change the selected nav item 
			$('.navItem').removeClass('active');
			$('.reportNav').addClass('active');
		},
		activate: function(data) {
		}
	};
});
