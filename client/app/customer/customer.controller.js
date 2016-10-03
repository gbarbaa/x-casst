'use strict';
(function(){

class CustomerComponent {
  constructor() {
    this.options = [
      {field: 'photo', heading: 'Image', dataType: 'image'},
      {field: 'name', noSort: true, noEdit: true},
      {field: 'address', dataType: 'textarea'},
      {field: 'country', dataType: 'select', options: ['India', 'USA', 'Australlia', 'China', 'Japan']},
      {field: 'active', heading: 'Status', dataType: 'boolean'}
    ];
  }
}

angular.module('crudApp')
  .component('customer', {
    templateUrl: 'app/customer/customer.html',
    controller: CustomerComponent
  });

})();
