var API = 'http://api.apixu.com/v1/forecast.json?key=05aa80b7d82640e0820233956160408&q=Amherst,NY&days=10';
// var API = '/index.html'
app.factory('forecast', ['$http', function($http) {

  return $http.get(API).success(function(data) {
    return data;
  });
}]);
