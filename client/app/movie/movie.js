'use strict';

angular.module('crudApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('movie', {
        url: '/movie',
        template: '<movie></movie>',
        authenticate: true,
        title:'Trending Movies'
      });
  });
