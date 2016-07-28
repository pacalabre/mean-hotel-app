angular.module('meanhotel',['ngRoute'])
.config(config)
.controller('HotelsController', HotelsController);

function config($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'angular-app/hotel-list/hotels.html',
      controller: HotelsController,
      controllerAs: 'vm'
    });
}


