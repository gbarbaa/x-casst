'use strict';
(function(){

class TaskComponent {
  constructor() {
    this.options = [
      {field: 'image', heading: 'Image', dataType: 'image'},
      {field: 'name', title: 'Title', dataType: 'text'},
      {field: 'author', dataType: 'text'},
      {field: 'category', dataType: 'select', options: ['Fiction', 'Non fiction', 'Inspirational', 'Novel', 'Science', 'Story']},
      {field: 'price', dataType: 'currency'},
      {field: 'releaseDate', dataType: 'date'},
      {field: 'isbn', heading: 'ISBN', dataType: 'text', noEdit: true},
      {field: 'active', heading: 'Availability', dataType: 'boolean'}
    ];
  }
}

angular.module('crudApp')
  .component('task', {
    templateUrl: 'app/task/task.html',
    controller: TaskComponent
  });

})();
