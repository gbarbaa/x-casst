'use strict';

angular.module('crudApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('/', {
        url: '/',
        template: '<main class="fx"></main>',
        title:'MongoDB Based Material Designed CRUD Table'
      });
  });
