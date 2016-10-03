'use strict';

describe('Component: CustomerComponent', function () {

  // load the controller's module
  beforeEach(module('crudApp'));

  var CustomerComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    CustomerComponent = $componentController('CustomerComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
