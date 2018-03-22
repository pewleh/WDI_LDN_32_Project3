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
        zoom: 9,
        center: { lat: 51.515328, lng: -0.072031 },
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
      let infoWindow = null;
      $scope.$watch('place', () => {
        infoWindow = new google.maps.InfoWindow();
        $scope.place.forEach(place => showMarkers(place));
      });

      function showMarkers(place) {
        console.log(place.weather.data[0].icon);
        const marker = new google.maps.Marker({
          position: { lat: place.location.lat, lng: place.location.lng },
          map: map,
          icon: `/assets/images/weather-SVG/${place.weather.data[0].icon}.svg`
        });
        marker.addListener('click', () => {
          showInfoWindow(place, marker);
        });
      }
      function showInfoWindow(place, marker) {
        infoWindow.close();
        infoWindow.setContent(`<div><img class="infoWindow" src=${place.image}><h1>${place.name}</h1><h1>${place.type}</h1><h1>${place.address}</h1><a href="/#!/places/${place._id}">Show More</a></div>`);
        infoWindow.open(map, marker);
        map.setCenter(marker.getPosition());
      }
    }
  };
}

export default googleMap;

/* <h1>${place.weather.data.day.moonPhase}</h1> */
