// angular.module('myApp').controller('MainController', MainController).controller('FilmController', FilmController);

// function MainController($http) {
//   var vm = this;
//   vm.name = "Paul";

//   $http.get('http://swapi-tpiros.rhcloud.com/films').then(function(response) {
//     vm.films = response.data;
//   });
// }

// function FilmController($http,$routeParams) {
//   var vm = this;
//   var id = $routeParams.id;
//   $http.get('http://swapi-tpiros.rhcloud.com/films/'+id).then(function(response){
//     vm.films = response.data;
//     console.log(vm.films);
//   })
// }
