'use strict';

angular.module('crudApp.auth', [
  'crudApp.constants',
  'crudApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
