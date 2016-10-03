'use strict';

describe('Component: DocumentationComponent', function () {

  // load the controller's module
  beforeEach(module('crudApp'));

  var DocumentationComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    DocumentationComponent = $componentController('DocumentationComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
