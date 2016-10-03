'use strict';
(function() {

function CrudTableListController($scope, $http, socket, $state, $stateParams, Modal, Toast, Settings) {
  var api = $stateParams.api;
  var options = $stateParams.options;
  this.cols = $stateParams.columns;
  this.header = api;
  this.sort = {};
  var vm = this;
  vm.loading = true;

	// the selected item id
	var _id = null;
  var originatorEv;

  if(options){
    if(options.predicate){
      this.sort.predicate = options.predicate;
    }else{
      this.sort.predicate = 'name';
    }
  }
  this.sort.reverse = true;
  this.order = function(predicate) {
    this.sort.reverse = (this.sort.predicate === predicate) ? !this.sort.reverse : false;
    this.sort.predicate = predicate;
  };
  this.no = {};
  if('noadd' in options) {
    this.no.add = true;
  }
  if('nodelete' in options) {
    this.no.delete = true;
  }
  if('noedit' in options) {
    this.no.edit = true;
  }
  if('nosort' in options) {
    this.no.sort = true;
  }
  if('nosearch' in options) {
    this.no.filter = true;
  }
  if('nofilter' in options) {
    this.no.filter = true;
  }
  if('noexport' in options) {
    this.no.export = true;
  }
  this.l = 10;
  this.loadMore = function() {
    // console.log('loadMore');
    this.l += 2;
  };

  this.exportData = function (type) {
    var data = JSON.stringify(this.data, undefined, 2);
    var blob;
    if(type==='txt'){
    // Save as .txt
       blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
      saveAs(blob, options.api+'.txt');
    }else if(type==='csv'){
    // Save as .csv
      blob = new Blob([document.getElementById('exportable').innerHTML], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8'});
      saveAs(blob, options.api+".csv");
    }else if(type==='xls'){
    // Save as xls
      blob = new Blob([document.getElementById('exportable').innerHTML], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
      });
      saveAs(blob, options.api+".xls");
    }else{
    // Save as .json
    blob = new Blob([data], {type: 'text/plain;charset=utf-8'});
    saveAs(blob, options.api+'.json');
    }
  };

  this.openMenu = function($mdOpenMenu, ev) {
    originatorEv = ev;
    $mdOpenMenu(ev);
  };
  vm.isSelected = function(product) {
    return _id === product._id;
  };

  // Start query the database for the table
  vm.loading = true;
  $http.get('/api/'+api+'s').then(function(res) {
    vm.loading = false;
    vm.data = res.data;
    socket.syncUpdates(api, vm.data);
  },handleError);

  this.changeStatus = function(x){
      $http.put('/api/'+api+'s/' + x._id, {active: x.active}).then(function() {
      },handleError);
  };

  this.copy = function(data) {
    if(Settings.demo){
      Toast.show({
        type: 'error',
        text: 'Duplicating not allowed in demo mode'
      });
      return;
    }
    if(confirm('Are you sure to duplicate? ')){
        // vm.data = data;
        var d = angular.copy(data);
        delete d._id; 
      $http.post('/api/'+options.api+'s', d)
		.then(function(response) {
			Toast.show({
    	       type: 'success',
	           text: 'The '+options.api+' copied successfully.'
	        });
		})
		.catch(function(err) {
			Toast.show({
				type: 'warn',
				text: 'Error while duplicating '+options.api
			});
		});
    }
  };

  this.delete = function(data) {
    if(Settings.demo){
      Toast.show({
        type: 'error',
        text: 'Delete not allowed in demo mode'
      });
      return;
    }
    if(confirm('Are you sure to delete? ')){
      $http.delete('/api/'+api+'s/' + data._id).then(function() {},handleError);
    }
  };

  function handleError(error) { // error handler
      vm.loading = false;
      if(error.status === 401 || error.status === 403){
        Toast.show({
          type: 'error',
          text: 'Not authorised to make changes.'
        });
      }
      else if(error.status !==500){
        Toast.show({
          type: 'error',
          text: error.status
        });
      }
  }

  $scope.$on('$destroy', function() {
    socket.unsyncUpdates(api);
  });

  this.showInDetails = function (item) {
    _id = item._id;
    $state.go('detail', {'data': item}, { location: false });
  };

}

angular.module('crudApp')
  .controller('CrudTableListController', CrudTableListController);

})();
