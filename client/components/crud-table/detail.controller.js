'use strict';
(function() {

function CrudTableDetailController($http, $state, Toast, $stateParams, ToggleComponent, Settings, $mdDialog, socket, $scope) {
  var vm = this;
  var api = $stateParams.api;
  // var _id = $stateParams.id;
  vm.myDate = new Date();
  vm.header = api;
  vm.item = angular.copy($stateParams.data);
  vm.columns = $stateParams.columns;
  vm.mediaLibrary = function(){
    $mdDialog.show({
      templateUrl: '/components/crud-table/media-library.html',
      controller: function($scope, $mdDialog) {
        // Start query the database for the table
        $scope.loading = true;
        $http.get('/api/media/').then(function(res) {
          $scope.loading = false;
          $scope.media = res.data;
          socket.syncUpdates('media', $scope.data);
        }, handleError);

        function handleError(error) { // error handler
            $scope.loading = false;
            if(error.status === 403){
              Toast.show({
                type: 'error',
                text: 'Not authorised to make changes.'
              });
            }
            else if(error.status !== 500){
              Toast.show({
                type: 'error',
                text: error.status
              });
            }
        }
        $scope.ok = function(path){
          $mdDialog.hide(path);
        }
        $scope.hide = function() {
          $mdDialog.hide();
        };
        $scope.cancel = function() {
          $mdDialog.cancel();
        };
        $scope.addNewImage = function(){
          $state.go('media');
          $mdDialog.hide();
        }
      }
    }).then(function(answer) {
      vm.item.image = answer;
    }, function() {
      // $scope.alert = '';
    });
  }

  // goBack.$inject = ['ToggleComponent'];
  function goBack() {
    ToggleComponent('crud-table.detailView').close();
    $state.go('^', {}, { location: false });
    // console.log('go back');
  }
  vm.goBack = goBack;

  vm.edit = function(product) {
    if(Settings.demo){
      Toast.show({
        type: 'error',
        text: 'Editing not allowed in demo mode'
      });
      return;
    }
    // refuse to work with invalid data
    if(!product){
      return;
    }
    // console.log(product.orderDate);
    $http.put('/api/'+api+'s/'+product._id, product)
    .then(success)
    .catch(err);
    function success(res) {
      var item = vm.item = res.data;
      Toast.show({
        type: 'success',
        text: api + ' has been updated'
      });
    }

    function err(err) {
      Toast.show({
        type: 'warn',
        text: 'Error while updating database'
      });
    }
  };

}

angular.module('crudApp')
  .controller('CrudTableDetailController', CrudTableDetailController);

})();
