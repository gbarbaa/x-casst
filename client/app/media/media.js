'use strict';

angular.module('crudApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('media', {
        url: '/media',
        template: '<media class="fx"></media>',
        authenticate: true,
        title:'Upload Images'
      });
  });
