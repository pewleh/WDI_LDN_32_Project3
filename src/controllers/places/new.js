PlacesNewCtrl.$inject = ['Place', '$state'];

function PlacesNewCtrl(Place, $state) {
  this.newPlace = {};

  function handleSubmit() {
    if(this.form.$invalid) return false;
    Place.create(this.newPlace)
      .then(() => $state.go('placesIndex'));
  }
  this.handleSubmit = handleSubmit;
}

export default PlacesNewCtrl;
