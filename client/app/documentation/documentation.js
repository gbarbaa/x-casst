'use strict';

angular.module('crudApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('documentation', {
        url: '/documentation',
        template: '<documentation></documentation>'
      });
  });
