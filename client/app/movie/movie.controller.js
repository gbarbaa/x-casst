'use strict';
(function(){

class MovieComponent {
  constructor() {
    this.options = [
      {field: 'image', title: 'Poster', dataType: 'image'},
      {field: 'name', heading: 'Title', noEdit: true},
      {field: 'production'},
      {field: 'rating', dataType: 'number'},
      {field: 'genre', dataType: 'select', options: ['Action', 'Comedy', 'Drama', 'Romance', 'SiFi', 'Thriller'], noSort: true},
      {field: 'language', dataType: 'select', options: ['English', 'Hindi', 'French']},
      {field: 'releaseDate', dataType: 'date'},
      {field: 'active', heading: 'Status', dataType: 'boolean'}
    ];
  }
}

angular.module('crudApp')
  .component('movie', {
    templateUrl: 'app/movie/movie.html',
    controller: MovieComponent
  });

})();
