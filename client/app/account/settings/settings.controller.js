'use strict';

class SettingsController {
  constructor(Auth,Settings,Toast) {
    this.errors = {};
    this.submitted = false;
    this.Settings = Settings;
    this.Toast = Toast;
    this.Auth = Auth;
  }

  changePassword(form) {
    this.submitted = true;

    if (form.$valid && !this.Settings.demo) {
      this.Auth.changePassword(this.user.oldPassword, this.user.newPassword)
        .then(() => {
          this.message = 'Password successfully changed.';
        })
        .catch(() => {
          form.password.$setValidity('mongoose', false);
          this.errors.other = 'Incorrect password';
          this.message = '';
        });
    }else{
        this.Toast.show({
            type: 'info',
            text: 'Password can not be changed in Demo Mode'
        });
    }
  }
}

angular.module('crudApp')
  .controller('SettingsController', SettingsController);
