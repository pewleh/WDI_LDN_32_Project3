/* global google */

function googleMap() {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="collection-google-map"></div>',
    scope: {
      center: '=',
      place: '='
    },
    link($scope, $element) {

      let marker;
      let infoWindow;
      const markers = [];

      // const map = new google.maps.Map($element[0], {
      //   zoom: 14,
      //   center: $scope.center
      // });

      const map = new google.maps.Map($element[0], {
        zoom: 4,
        center: new google.maps.LatLng(50,2)
      });

      function setPlaceMarker(map, position, content, /* icon */) {
        const markerOptions = {
          position: placeLocation,
          map: map
          // icon: icon
        };

        marker = new google.maps.Marker(markerOptions);
        markers.push(marker);

        google.maps.event.addListener(marker, 'click', function () {
          if (infoWindow !== void 0) {
            infoWindow.close();
          }
          const infoWindowOptions = {
            content: content
          };
          infoWindow = new google.maps.InfoWindow(infoWindowOptions);
          infoWindow.open(map, marker);
        });
      }

      // setMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'Just some content', 'http://www.myiconfinder.com/uploads/iconsets/256-256-a5485b563efc4511e0cd8bd04ad0fe9e.png');
      // setMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Different content', 'http://www.newdesignfile.com/postpic/2013/01/google-map-marker-icon_281323.png');

      setPlaceMarker(map, new google.maps.LatLng(51.508515, -0.125487), 'Just some content');
      setPlaceMarker(map, new google.maps.LatLng(52.370216, 4.895168), 'Different content');

      // const marker = new google.maps.Marker({
      //   position: $scope.center,
      //   map: map
      // });

      $scope.$watch('center', () => {
        // map.setCenter($scope.center);
        // marker.setPosition(markers);
      });
      console.log($scope.center);
    }
  };
}

export default googleMap;
