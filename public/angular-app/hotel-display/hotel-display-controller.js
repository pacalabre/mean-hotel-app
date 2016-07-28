angular.module('meanhotel').controller('HotelController', HotelController);

function HotelsController($http, $routeParams) {
  var vm = this;
  var id = $routeParams.id;
  $http.get('/api/hotels/' + id).then(function(response) {
    vm.hotel = response.data;
  })
}
