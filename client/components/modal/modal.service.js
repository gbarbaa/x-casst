(function () {
	'use strict';

	angular
		.module('crudApp')
		.factory('Modal', Modal)
		.controller('ModalController', ModalController);

	Modal.$inject = ['$mdDialog', '$state'];
	ModalController.$inject = ['$mdDialog', 'Toast', '$http', 'options', 'cols', 'Settings'];

	function Modal($mdDialog, $state) {
        var obj = {};
        obj.show = function(cols,options){
            $mdDialog.show({
                controller: 'ModalController as create',
                templateUrl: 'components/modal/create.html',
                clickOutsideToClose: false,
                locals: {cols: cols,options: options}
            });
        };

        return obj;
    }

    function ModalController($mdDialog, Toast, $http, options, cols, Settings) {
        var vm = this;
        vm.create = createUser;
        vm.close = hideDialog;
        vm.cancel = cancelDialog;
        vm.options = options;
        vm.options.columns = cols;
        vm.title = options.api;
        function createUser(form) {
            if(Settings.demo){
                Toast.show({
                    type: 'error',
                    text: 'Creation not allowed in demo mode'
                });
                return;
            }
            // refuse to work with invalid cols
            if (vm.item._id || (form && !form.$valid)) {
                return;
            }

            $http.post('/api/'+options.api+'s', vm.item)
            .then(createUserSuccess)
            .catch(createUserCatch);
            function createUserSuccess(response) {
                Toast.show({
                    type: 'success',
                    text: 'New '+options.api+' saved successfully.'
                });
                vm.close();
            }

            function createUserCatch(err) {
                Toast.show({
                    type: 'warn',
                    text: 'Error while creating new '+options.api
                });
            }
        }

        function hideDialog() {
            $mdDialog.hide();
        }

        function cancelDialog() {
            $mdDialog.cancel();
        }
    }
})();
