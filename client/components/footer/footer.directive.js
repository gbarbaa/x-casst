'use strict';

angular.module('crudApp')
  .directive('footer', function ($mdDialog, $http) {
    return {
      templateUrl: 'components/footer/footer.html',
      restrict: 'E',
      link: function(scope, element) {
        element.addClass('footer');
        scope.addDialog = function() {
        $mdDialog.show({
          templateUrl: 'components/footer/contact-form.html',
          controller: function($scope, $mdDialog) {
              $scope.hide = function() {
                  $mdDialog.hide();
              };
              $scope.cancel = function() {
                  $mdDialog.cancel();
              };
              $scope.send = function(mail) {
            		$http.post('/api/sendmail', {
            			from: 'CodeNx <admin@codenx.com>',
                        to: 'support@codenx.com',
                        subject: 'Message from cCRUD',
                        text: mail.message
            		});
                $mdDialog.hide(mail);
              };
          }
      }).then(function(answer) {
          scope.alert = 'You said the information was "' + answer + '".';
      }, function() {
          scope.alert = 'You cancelled the dialog.';
      });
    }
      }
    };
  });
