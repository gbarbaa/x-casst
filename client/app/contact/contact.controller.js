'use strict';
(function(){

class ContactComponent {
  constructor() {
    this.options = [
      {field: 'photo', dataType: 'image'},
      {field: 'name', noEdit: true},
      {field: 'email'},
      {field: 'phone'},
      {field: 'category', dataType: 'select', options: ['Family', 'Friends', 'Acquaintances', 'Services']},
      {field: 'active', dataType: 'boolean'}
    ];
  }
}

angular.module('crudApp')
  .component('contact', {
    templateUrl: 'app/contact/contact.html',
    controller: ContactComponent
  });

})();
