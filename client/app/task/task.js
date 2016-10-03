'use strict';

angular.module('crudApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('task', {
        url: '/task',
        template: '<task></task>',
        authenticate: true,
        title: 'Tasks To Read'
      });
  });
