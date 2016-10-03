'use strict';

(function() {

class AdminController {
  constructor(appConfig) {
    // Use the User $resource to fetch all users
    // this.users = User.query();
    var userRoles = appConfig.userRoles || [];
    this.options = [
    //   {field: 'image', dataType: 'image'},
      {field: 'name'},
      {field: 'email'},
      {field: 'role', dataType: 'select', options: userRoles},
      {field: 'active', dataType: 'boolean'}
    ];
  }

  // delete(user) {
  //   user.$remove();
  //   this.users.splice(this.users.indexOf(user), 1);
  // }
}

angular.module('crudApp.admin')
  .controller('AdminController', AdminController);

})();
