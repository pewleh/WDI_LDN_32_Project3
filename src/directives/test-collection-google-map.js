/* global google */
googleMap.$inject = ['Place'];

function googleMap(Place) {
  return {
    restrict: 'E',
    replace: true,
    template: '<div class="collection-google-map"></div>',
    scope: {
      center: '=',
      place: '='
    },
    link($scope, $element) {

      let infoWindow;

      const latLng = { lat: 50, lng: 2 };
      const map = new google.maps.Map($element[0], {
        zoom: 4,
        center: latLng
      });

      // console.log()

      function getPlaceData() {
        Place.findPlace()
          .then(() => console.log('hello'))
          .then(placeData => placeData.forEach(setPlaceMarker));
      }

      function setPlaceMarker(map, position, place) {
        const placeLocation = { lat: place.location.lat, lng: place.lng };

        const marker = new google.maps.Marker({
          position: placeLocation,
          map: map,
          place: place
        });

        marker.addListener('click', () => {
          createInfoWindowForMarker(marker, place);
        });
      }

      function createInfoWindowForMarker(marker, place) {
        if (infoWindow) infoWindow.close();
        infoWindow = new google.maps.InfoWindow({
          content: `<h3>${place.name}</h3>`
        });
        infoWindow.open(map, marker);
        map.setCenter(marker.getPosition());
      }

      setPlaceMarker(map, new google.maps.LatLng(51.508515, -0.125487), place);
      setPlaceMarker(map, new google.maps.LatLng(52.370216, 4.895168), place);

      $scope.$watch('center', () => {
        // map.setCenter($scope.center);
        // marker.setPosition(markers);
      });
      getPlaceData();
    }
  };
}

export default googleMap;
