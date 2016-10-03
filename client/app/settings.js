'use strict';
(function() {
angular.module('crudApp')
.constant('Settings', {
  demo: false,
  menu: {
    pages : [
      {text:'Books', icon: 'book', url: 'book', authenticate: true},
//      {text:'Contacts', icon: 'contacts', url: 'contact', authenticate: true},
      {text:'Candidates', icon: 'people', url: 'customer', authenticate: true},
//      {text:'Clients', icon: 'assignment', url: 'task', authenticate: true},
      {text:'Clients', icon: 'contacts', url: 'contact', authenticate: true},
      {text:'Assessments', icon: 'description', url: 'documentation', authenticate: true},
//      {text:'Media Library', icon: 'photo_library', url: 'media', authenticate: true},
      {text:'Tasks', icon: 'assignment', url: 'task', authenticate: true},
      {text:'Users', icon: 'perm_identity', url: 'admin', authenticate: true, role: 'admin'}
    ]
  }
});
})();
