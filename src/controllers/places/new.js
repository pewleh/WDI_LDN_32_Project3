PlacesNewCtrl.$inject = ['Place', '$state'];

function PlacesNewCtrl(Place, $state) {
  this.newPlace = {
    lat: 0,
    lng: 0
  };

  function handleSubmit() {
    console.log(this.newPlace);
    if(this.form.$invalid) return false;
    Place.create(this.newPlace)
      .then(() => $state.go('placesIndex'));
  }
  this.handleSubmit = handleSubmit;
}

export default PlacesNewCtrl;
