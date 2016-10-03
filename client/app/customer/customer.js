'use strict';

angular.module('crudApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('customer', {
        url: '/customer',
        template: '<customer></customer>',
        authenticate: true,
        title:'All Customers of CRUD Table'
      });
  });
