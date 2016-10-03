'use strict';

describe('Component: MediaComponent', function () {

  // load the controller's module
  beforeEach(module('crudApp'));

  var MediaComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    MediaComponent = $componentController('MediaComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
