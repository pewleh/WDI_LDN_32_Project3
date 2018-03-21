/* global google */

function googleMap() {

  let currentLocation = {};

  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '='
    },
    link($scope, $element) {

      const map = new google.maps.Map($element[0], {
        zoom: 14,
        center: $scope.center
      });

      navigator.geolocation.getCurrentPosition(pos => {
        console.log(pos.coords.latitude);
        console.log(pos.coords.longitude);
        const userCurrentLat = pos.coords.latitude;
        const userCurrentLng = pos.coords.longitude;

        currentLocation = { lat: userCurrentLat, lng: userCurrentLng };
        displayRoute();
        $scope.$apply();
      });

      const directionsDisplay = new google.maps.DirectionsRenderer();
      const directionsService = new google.maps.DirectionsService();
      // const origin = currentLocation;
      // console.log(origin);

      directionsDisplay.setMap(map);

      function displayRoute() {

        directionsService.route({
          origin: currentLocation,
          destination: $scope.center,
          travelMode: 'DRIVING'
        }, (response) => {
          directionsDisplay.setDirections(response);
        });
      }

      const marker = new google.maps.Marker({
        position: $scope.center,
        map: map
      });

      $scope.$watch('center', () => {
        map.setCenter($scope.center);
        marker.setPosition($scope.center);
      });
      console.log($scope.center);
    }
  };
}

export default googleMap;
