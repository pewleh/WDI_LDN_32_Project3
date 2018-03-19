/* global google */

console.log(google);
function googleMap() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="google-map"></div>',
    scope: {
      center: '='
    },
    link($scope, $element) {

      console.log($scope.center);

      const map = new google.maps.Map($element[0], {
        zoom: 14,
        center: $scope.center
      });
      new google.maps.Marker({
        position: $scope.center,
        map: map
      });
    }
  };
}

export default googleMap;

// function GoogleMap() {
//   return {
//     restrict: 'E',
//     replace: true,
//     template: '<div class="google-map"></div>',
//     scope: {
//       center: '='
//     },
    // link($scope, $element) {
    //
    //   // This is the data in the `center` attribute of the directive
    //   console.log($scope.center); // { lat: 51.5, lng: -0.07 }
    //
    //   new google.maps.Map($element[0], {
    //     zoom: 14,
    //     center: { lat: 51.5, lng: -0.07 }
    //   });
//     }
//   };
// }
