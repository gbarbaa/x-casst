'use strict';

angular.module('crudApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('book', {
        url: '/book',
        template: '<book></book>',
        authenticate: true,
        title: 'Books To Read'
      });
  });
