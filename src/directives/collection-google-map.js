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

      const map = new google.maps.Map($element[0], {
        zoom: 8,
        center: { lat: 51.515328, lng: -0.072031 }
      });

      $scope.$watch('place', () => {
        console.log($scope.place);
        $scope.place.forEach(place => showMarkers(place));
      });

      function showMarkers(place) {
        const marker = new google.maps.Marker({
          position: { lat: place.location.lat, lng: place.location.lng },
          map: map
        });
        marker.addListener('click', () => {
          showInfoWindow(place, marker);
        });
      }
      function showInfoWindow(place, marker) {
        if (infoWindow) infoWindow.close();
        const infoWindow = new google.maps.InfoWindow();
        infoWindow.setContent(`<div><img class="infoWindow" src=${place.image}><h1>${place.name}</h1><h1>${place.type}</h1><h1>${place.address}</h1><a href="/#!/places/${place._id}">Show More</a></div>`);
        infoWindow.open(map, marker);
        map.setCenter(marker.getPosition());
      }
    }
  };
}

export default googleMap;
