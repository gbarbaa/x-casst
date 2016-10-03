'use strict';

describe('Component: MovieComponent', function () {

  // load the controller's module
  beforeEach(module('crudApp'));

  var MovieComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    MovieComponent = $componentController('MovieComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
