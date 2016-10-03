'use strict';
(function(){

class DocumentationComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('crudApp')
  .component('documentation', {
    templateUrl: 'app/documentation/documentation.html',
    controller: DocumentationComponent
  });

})();
