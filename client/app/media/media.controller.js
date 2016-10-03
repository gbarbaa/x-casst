'use strict';
(function(){

class MediaComponent {
  constructor($scope,$http, socket, Upload, $timeout, $mdDialog, Settings, Toast) {
    this.message = 'Hello';
    // Start query the database for the table
    this.loading = true;
    this.$http = $http;
    this.$scope = $scope;
    this.socket = socket;
    this.Upload = Upload;
    this.Toast = Toast;
    this.Settings = Settings;
    this.$timeout = $timeout;
    this.$mdDialog = $mdDialog;
    this.log = '';
  }
$onInit() {
  var vm = this;
  this.$http.get('/api/media/').then(function(res) {
      vm.loading = false;
      vm.data = res.data;
      vm.socket.syncUpdates('media', vm.data);
    }, vm.handleError);
    vm.$scope.$watch('files', function () {
        vm.upload(vm.files);
    });
    vm.$scope.$watch('file', function () {
        if (vm.file != null) {
            vm.files = [vm.file];
        }
    });
}
  imageDetails(img) {
  this.$mdDialog.show({
    templateUrl: '/app/media/image-details.html',
    controller: function($http,$mdDialog,$scope,Toast,Settings) {
        $scope.img = img;
        $scope.delete = function(img){
          if(Settings.demo){
            Toast.show({
              type: 'error',
              text: 'Delete not allowed in demo mode'
            });
            return;
          }
          var confirm = $mdDialog.confirm()
            .title('Would you like to delete the media permanently?')
            .textContent('Media once deleted can not be undone.')
            .ariaLabel('Delete Media')
            .ok('Please do it!')
            .cancel('Cancel');
          $mdDialog.show(confirm).then(function() {
            $http.delete('/api/media/' + img._id).then(function() {
              $mdDialog.hide();
            },handleError);
          }, function() {
            $mdDialog.hide();
          });
        }
        
        $scope.hide = function() {
            $mdDialog.hide();
        };
        $scope.cancel = function() {
            $mdDialog.cancel();
        };
        var handleError = function(error) { // error handler
          this.loading = false;
          if(error.status === 403){
            Toast.show({
              type: 'error',
              text: 'Not authorised to make changes.'
            });
          }
          else{
            Toast.show({
              type: 'error',
              text: error.status
            });
          }
        }
      }
    }).then(function(answer) {
      // this.alert = 'You said the information was "' + answer + '".';
    }, function() {
      // this.alert = 'You cancelled the dialog.';
    });
  }
    

  handleError(error) { // error handler
        this.loading = false;
        if(error.status === 403){
          this.Toast.show({
            type: 'error',
            text: 'Not authorised to make changes.'
          });
        }
        else{
          this.Toast.show({
            type: 'error',
            text: error.status
          });
        }
    }
    

    upload(files){
      var vm = this;
      if(vm.Settings.demo){
            vm.Toast.show({
              type: 'error',
              text: 'Uploading not allowed in demo mode'
            });
            return;
        }
        if (files && files.length) {
            for (var i = 0; i < files.length; i++) {
              var file = files[i];
              if (!file.$error) {
                this.Upload.upload({
                    url: 'api/media',
                    data: {
                      username: this.username,
                      file: file
                    }
                }).then(function (resp) {
                    vm.$timeout(function() {
                        vm.log = 'file: ' +
                        resp.config.data.file.name +
                        ', Response: ' + JSON.stringify(resp.data) +
                        '\n' + vm.log;
                        vm.result = resp.data;
                    });
                }, function (response) {
                    if (response.status > 0) {
                        vm.errorMsg = response.status + ': ' + response.data;
                    }
                }, function (evt) {
                    var progressPercentage = parseInt(100.0 *
                    		evt.loaded / evt.total);
                    vm.log = 'progress: ' + progressPercentage +
                    	'% ' + evt.config.data.file.name + '\n' +
                      vm.log;
                    vm.progress =
                          Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                });
              }
            }
        }
    };
  }

angular.module('crudApp')
  .component('media', {
    templateUrl: 'app/media/media.html',
    controller: MediaComponent
  });

})();
