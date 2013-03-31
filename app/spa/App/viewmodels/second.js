define(function(require) {
	return {
		viewAttached: function() {
			// Change the selected nav item 
			$('.customerNav').removeClass('active');
			$('.firstNav').removeClass('active');
			$('.secondNav').addClass('active');
			$('.patientNav').removeClass('active');
		},
		activate: function(data) {
		}
	};
});