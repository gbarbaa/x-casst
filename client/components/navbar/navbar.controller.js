'use strict';

class NavbarController {
  constructor(ToggleComponent, Auth, $attrs, Settings, LoginModal, CpModal, $scope,$mdMedia) {

    var vm = this;
    vm.showDropdownMenu = false;
    vm.isLoggedIn = Auth.isLoggedIn;
    vm.hasRole = Auth.hasRole;
    vm.isAdmin = Auth.isAdmin;
    vm.currentUser = Auth.getCurrentUser();
    $scope.$watch(function() { return $mdMedia('xs'); }, function(xs) {
      vm.smallScreen = xs;
    });
    vm.menu = Settings.menu;

    vm.toggleLeft = function(){
      ToggleComponent('left').open();
    };
    var originatorEv;
    vm.openMenu = function($mdOpenMenu, ev) {
      originatorEv = ev;
      $mdOpenMenu(ev);
    };
    vm.showLogin = function () {
        LoginModal.show('/');
    }
    vm.showCp = function () {
        CpModal.show();
    }
    vm.leftMenu = ($attrs.leftmenu === 'true');
  }
}

angular.module('crudApp')
  .controller('NavbarController', NavbarController);
