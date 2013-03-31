define(function(require) {
	return {
		viewAttached: function() {
			$('.patientNav').addClass('active');
			$('.firstNav').removeClass('active');
			$('.secondNav').removeClass('active');
			$('.customerNav').removeClass('active');
		},
		activate: function(data) {
		}
	};
});