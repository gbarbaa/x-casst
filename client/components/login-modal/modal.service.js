(function () {
	'use strict';

	angular
		.module('crudApp')
		.factory('LoginModal', LoginModal)
		.factory('CpModal', CpModal)
		.controller('LoginModalController', LoginModalController)
		.controller('SignUpModalController', SignUpModalController)
		.controller('CpModalController', CpModalController);

	function CpModal($mdDialog) {
        var obj = {};
        obj.show = function(){
            $mdDialog.show({
                controller: 'CpModalController as cp',
                templateUrl: 'components/login-modal/cp.html',
                clickOutsideToClose: false
            }).then(function(answer) {
                // this.status = 'You closed the dialog.';
            }, function() {
                // this.status = 'You cancelled the dialog.';
            });
        };
        return obj;
    }
    
    function LoginModal($mdDialog, $state) {
        var obj = {};
        obj.show = function(nextRoute){
            $mdDialog.show({
                // controller: 'LoginModalController as login',
                templateUrl: 'components/login-modal/index.html',
                clickOutsideToClose: false
            }).then(function(answer) {
                $state.go(nextRoute);
            }, function() {
                // $scope.status = 'You cancelled the dialog.';
            });
        };
        return obj;
    }

    function CpModalController($mdDialog, Toast, Auth, Settings) {
        this.errors = {};
        this.submitted = false;
        this.Settings = Settings;
        this.Toast = Toast;
        this.Auth = Auth;
        this.close = function(){
          $mdDialog.cancel();
        };
        this.changePassword = function(form) {
          var vm = this;
          this.submitted = true;
          if(this.Settings.demo){
            this.Toast.show({
                type: 'info',
                text: 'Password can not be changed in Demo Mode'
            });
          }
          if (form.$valid) {
            this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
              .then(() => {
                this.message = 'Password successfully changed.';
                $mdDialog.hide();
              })
              .catch(() => {
                form.password.$setValidity('mongoose', false);
                this.errors.other = 'Incorrect password';
                this.message = '';
              });
          }else{
            this.Toast.show({
                type: 'error',
                text: 'Error occured while changing password'
            });
          }
        }
    }
    function SignUpModalController($mdDialog, Toast, $http, Auth) {
        // this.user = {email: 'x', password: 'x'}; // To invalidate browser autocomplete
        this.errors = {};
        this.submitted = false;
        this.Auth = Auth;
        this.close = close;
        this.register = register;
        function close(){
          $mdDialog.cancel();
        }
        function register(form) {
            this.submitted = true;
            if (form.$valid) {
            this.loading = true;
            this.Auth.createUser({
                name: this.user.name,
                email: this.user.email,
                password: this.user.password
            })
            .then(() => {
                // Account created, redirect to home
                // this.$state.go('/');
                $mdDialog.hide();
            })
            .catch(err => {
                err = err.data;
                this.errors = {};
                this.loading = false;
                // Update validity of form fields that match the sequelize errors
                if (err.name) {
                    angular.forEach(err.errors, field => {
                        form[field.path].$setValidity('mongoose', false);
                        this.errors[field.path] = field.message;
                    });
                }
            });
            }
        }
    }
    function LoginModalController($mdDialog, Toast, $http, Auth, $state) {
        var vm = this;
        vm.create = createUser;
        vm.login = login;
        vm.close = close;
        vm.goForgot = goForgot;
        vm.user = {email: 'admin@codenx.com', password: 'codenx'};
        vm.errors = {};
        vm.submitted = false;
        vm.Auth = Auth;
        
        function goForgot(params) {
          close();
          $state.go('forgot',params);
        }        
        function close(){
          $mdDialog.cancel();
        }
        function createUser(form) {
            
        }
        function login(form) {
            this.submitted = true;
            if (form.$valid) {
                this.loading = true;
                this.Auth.login({
                    email: this.user.email,
                    password: this.user.password
                })
                .then(() => {
                    $mdDialog.hide();
                })
                .catch(err => {
                    this.errors.other = err.message;
                    this.loading = false;
                });
            }
        }
    }


})();
