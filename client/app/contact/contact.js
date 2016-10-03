'use strict';

angular.module('crudApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('contact', {
        url: '/contact',
        template: '<contact></contact>',
        authenticate: true,
        title:'My Contacts'
      });
  });
