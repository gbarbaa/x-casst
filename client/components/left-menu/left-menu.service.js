(function () {
	'use strict';

	angular
		.module('crudApp')
		.factory('PageOptions', PageOptions);

	function PageOptions() {
    var obj = {};
 	  obj.leftmenu = false;
 	  return obj;
  }
})();
