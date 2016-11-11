app.controller('MainController', ['$scope', 'forecast', function($scope, forecast) {
  forecast.success(function(data) {

    $scope.forecast = data.forecast.forecastday;
    $scope.city = data.location.name;
    $scope.region = data.location.region;
    $scope.todayDatetime = data.location.localtime_epoch * 1000;
    $scope.currentCondition = data.current.condition;
    $scope.currentTempF = data.current.temp_f;
    $scope.currentTempC = data.current.temp_c;
    $scope.fahrenheit = true;

    $scope.hourly = [];
    var currentEpoch = data.location.localtime_epoch;
    // var currentTime = new Date(currentEpoch * 1000);
    var currentTime = new Date();
    var day = 0,
        hour = 0,
        i = 0;

    while (i < 24) {
      var forecastHour = data.forecast.forecastday[day].hour[hour++];
      var epoch = forecastHour.time_epoch;
      var time = new Date(epoch * 1000);

      var sunrise = getSunrise();
      var sunset = getSunset();

      if (currentTime < time) {

        var icon = forecastHour.condition.icon;
        var newIcon = generateNewIcon(icon, time, sunrise, sunset);

        $scope.hourly = $scope.hourly.concat({
          time_epoch: epoch,
          temp_c: forecastHour.temp_c,
          temp_f: forecastHour.temp_f,
          icon: newIcon
        });
        i++;
      } // END IF

      if (hour == 23) {
        hour = 0;
        day++;
      }

    } // END WHILE

    function generateNewIcon(icon, time, sunrise, sunset) {

      var iconPrefix = icon.substr(0, 30);
      var iconSuffix = '';

      if (icon.substr(30, 1) == 'n') {
        iconSuffix = icon.substr(35, 8);
      }
      else {
        iconSuffix = icon.substr(33, 8);
      }

      if (time.getHours() > sunrise && time.getHours() <= sunset) {
        return iconPrefix + 'day' + iconSuffix;
      }
      else {
        return iconPrefix + 'night' + iconSuffix;
      }
    } // END GENERATE-NEW-

    function getSunrise() {
      return parseInt(data.forecast.forecastday[day].astro.sunrise);
    }

    function getSunset() {
      var sunset = data.forecast.forecastday[day].astro.sunset;
      var sunsetHour = parseInt(sunset);
      if (sunset.substr(6,2) == 'PM') {
        sunsetHour += 12;
      }
      return sunsetHour;
    }

  });
}]);
