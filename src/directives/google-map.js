/* global google */

function googleMap() {
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

      new google.maps.Marker({
        position: $scope.center,
        map: map
      });

      $scope.$watch('center', () => {
        map.setCenter($scope.center);
      });
      console.log($scope.center);
    }
  };
}

export default googleMap;
