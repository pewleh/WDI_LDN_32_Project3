/* global google */


function autoComplete() {
  return {
    restrict: 'C',
    link($scope, $element) {
      const address = new google.maps.places.Autocomplete($element[0]);
      // console.log(address);
      google.maps.event.addListener(address, 'place_changed', function () {
        const place = address.getPlace();
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        $scope.placesNew.newPlace.location = {
          lat: lat,
          lng: lng
        };
        // $scope.placesNew.newPlace.location.lat = lat;
        // $scope.placesNew.newPlace.location.lng = lng;
        // console.log(lat);
        // console.log(lng);
        // console.log($scope);
        $scope.placesNew.newPlace.address = address.gm_accessors_.place.fd.formattedPrediction;
      });
    }
  };
}

export default autoComplete;
