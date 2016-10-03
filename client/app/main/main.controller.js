'use strict';

(function() {

class MainController {

  constructor(Settings) {
    this.pages = [];
    this.pages = Settings.menu.pages;
  }

  $onInit() {
    // this.$http.get('/api/things').then(response => {
    //   this.awesomeThings = response.data;
    //   this.socket.syncUpdates('thing', this.awesomeThings);
    // });
  }

  getColor($index) {
    var _d = ($index + 1) % 11;
    var bg = '';

    switch(_d) {
      case 1:       bg = 'red';         break;
      case 2:       bg = 'green';       break;
      case 3:       bg = 'darkBlue';    break;
      case 4:       bg = 'blue';        break;
      case 5:       bg = 'yellow';      break;
      case 6:       bg = 'pink';        break;
      case 7:       bg = 'darkBlue';    break;
      case 8:       bg = 'purple';      break;
      case 9:       bg = 'deepBlue';    break;
      case 10:      bg = 'lightPurple'; break;
      default:      bg = 'yellow';      break;
    }

    return bg;
  }
}

angular.module('crudApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
