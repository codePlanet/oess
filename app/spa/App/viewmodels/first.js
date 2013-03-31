define(function(require) {
	return {
		viewAttached: function() {
			// Change the selected nav item 
			$('.customerNav').removeClass('active');
			$('.firstNav').addClass('active');
			$('.secondNav').removeClass('active');
			$('.patientNav').removeClass('active');
		},
		activate: function(data) {
		}
	};
});
