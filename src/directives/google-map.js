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
        center: $scope.center,
        styles: [
          {
            'featureType': 'all',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#242f3e'
              }
            ]
          },
          {
            'featureType': 'all',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#746855'
              }
            ]
          },
          {
            'featureType': 'all',
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'color': '#242f3e'
              }
            ]
          },
          {
            'featureType': 'administrative.locality',
            'elementType': 'geometry.fill',
            'stylers': [
              {
                'color': '#d59563'
              },
              {
                'weight': 8
              }
            ]
          },
          {
            'featureType': 'administrative.locality',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'color': '#d59563'
              },
              {
                'weight': 8
              }
            ]
          },
          {
            'featureType': 'administrative.locality',
            'elementType': 'labels.text',
            'stylers': [
              {
                'color': '#d59563'
              },
              {
                'weight': 8
              }
            ]
          },
          {
            'featureType': 'administrative.locality',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#f3d19c'
              },
              {
                'weight': 8
              }
            ]
          },
          {
            'featureType': 'administrative.locality',
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'visibility': 'off'
              },
              {
                'weight': 1
              }
            ]
          },
          {
            'featureType': 'administrative.neighborhood',
            'elementType': 'all',
            'stylers': [
              {
                'saturation': 100
              }
            ]
          },
          {
            'featureType': 'administrative.neighborhood',
            'elementType': 'geometry.fill',
            'stylers': [
              {
                'color': '#d59563'
              },
              {
                'weight': 8
              }
            ]
          },
          {
            'featureType': 'administrative.neighborhood',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'color': '#d59563'
              },
              {
                'weight': 8
              }
            ]
          },
          {
            'featureType': 'administrative.neighborhood',
            'elementType': 'labels.text',
            'stylers': [
              {
                'color': '#d59563'
              }
            ]
          },
          {
            'featureType': 'administrative.neighborhood',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#d59563'
              },
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'administrative.neighborhood',
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'color': '#d59563'
              },
              {
                'weight': 8
              }
            ]
          },
          {
            'featureType': 'poi',
            'elementType': 'all',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'poi',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#d59563'
              }
            ]
          },
          {
            'featureType': 'poi.park',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#263c3f'
              }
            ]
          },
          {
            'featureType': 'poi.park',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#6b9a76'
              }
            ]
          },
          {
            'featureType': 'poi.park',
            'elementType': 'labels.icon',
            'stylers': [
              {
                'color': '#6b9a76'
              }
            ]
          },
          {
            'featureType': 'road',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#485466'
              }
            ]
          },
          {
            'featureType': 'road',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#c4cad2'
              }
            ]
          },
          {
            'featureType': 'road',
            'elementType': 'labels.icon',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'road.highway',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#746855'
              }
            ]
          },
          {
            'featureType': 'road.highway',
            'elementType': 'geometry.stroke',
            'stylers': [
              {
                'color': '#1f2835'
              }
            ]
          },
          {
            'featureType': 'road.highway',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#e5e5e5'
              }
            ]
          },
          {
            'featureType': 'road.highway',
            'elementType': 'labels.icon',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'transit',
            'elementType': 'all',
            'stylers': [
              {
                'visibility': 'off'
              }
            ]
          },
          {
            'featureType': 'water',
            'elementType': 'geometry',
            'stylers': [
              {
                'color': '#17263c'
              }
            ]
          },
          {
            'featureType': 'water',
            'elementType': 'labels.text.fill',
            'stylers': [
              {
                'color': '#515c6d'
              }
            ]
          },
          {
            'featureType': 'water',
            'elementType': 'labels.text.stroke',
            'stylers': [
              {
                'color': '#17263c'
              }
            ]
          }
        ]
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

      const directionsShow = document.getElementById('directions-show');
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

      directionsDisplay.setPanel(directionsShow);

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
