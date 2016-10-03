'use strict';

(function() {

angular.module('crudApp.auth')
  .run(function($rootScope, $state, Auth, LoginModal, Toast) {
    // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role
    $rootScope.$on('$stateChangeStart', function(event, next) {
      // Routes that does not require login (Public routes)
      if (!next.authenticate) {
        return;
      }
      // Routes that require specific roles
      if (typeof next.authenticate === 'string') {
        Auth.hasRole(next.authenticate, _.noop).then(has => {
          if (has) {
            return;
          }
          $state.go('login');
          Toast.show({
              type: 'error',
              text: 'Unauthorized to make changes'
          });
        });
      }else{
      // Routes that require only authentication without any specific roles
        Auth.isLoggedInAsync(function(is) {
          if (!is) {
            event.preventDefault();
            LoginModal.show(next.name);
          }
        });
      }
  });
});
})();
