// /* global google */
//
// function googleMap() {
//   return {
//     restrict: 'E',
//     replace: true,
//     template: '<div class="collection-google-map"></div>',
//     scope: {
//       center: '=',
//       place: '='
//     },
//     link($scope, $element) {
//
//       const map = new google.maps.Map($element[0], {
//         zoom: 9,
//         center: { lat: 51.515328, lng: -0.072031 }
//       });
//       let infoWindow = null;
//
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(function(position) {
//           var pos = {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude
//           };
//
//           infoWindow.setPosition(pos);
//           infoWindow.setContent('Location found.');
//           infoWindow.open(map);
//           map.setCenter(pos);
//         }, function() {
//           handleLocationError(true, infoWindow, map.getCenter());
//         });
//       } else {
//         // Browser doesn't support Geolocation
//         handleLocationError(false, infoWindow, map.getCenter());
//       }
//
//       function handleLocationError(browserHasGeolocation, infoWindow, pos) {
//         infoWindow.setPosition(pos);
//         infoWindow.setContent(browserHasGeolocation ?
//           'Error: The Geolocation service failed.' :
//           'Error: Your browser doesn\'t support geolocation.');
//         infoWindow.open(map);
//       }
//
//       $scope.$watch('place', () => {
//         infoWindow = new google.maps.InfoWindow();
//         $scope.place.forEach(place => showMarkers(place));
//       });
//
//       function showMarkers(place) {
//         // console.log(place.weather.data[0].icon);
//         const marker = new google.maps.Marker({
//           position: { lat: place.location.lat, lng: place.location.lng },
//           map: map
//         });
//         marker.addListener('click', () => {
//           showInfoWindow(place, marker);
//         });
//       }
//       function showInfoWindow(place, marker) {
//         infoWindow.close();
//         infoWindow.setContent(`<div><img class="infoWindow" src=${place.image}><h1>${place.name}</h1><h1>${place.type}</h1><h1>${place.address}</h1><a href="/#!/places/${place._id}">Show More</a></div>`);
//         infoWindow.open(map, marker);
//         map.setCenter(marker.getPosition());
//       }
//     }
//   };
// }
//
// export default googleMap;
//
// /* <h1>${place.weather.data.day.moonPhase}</h1> */
