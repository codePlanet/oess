/**************************************************************************************************
 * Declare paths and dependencies for non AMD libraries such as jQuery
 *************************************************************************************************/
require.config({
	shim: {
		'jQuery': {
			exports: '$'
		},
		'sammy': {
			deps: ["jquery"],
			exports: "Sammy"
		}
	},
});

/**************************************************************************************************
 * Include files
 *************************************************************************************************/
require(['jquery', 'knockout', 'appViewModel'], function($, ko, appViewModel) {
    ko.applyBindings(new appViewModel());
});