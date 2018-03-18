PlacesEditCtrl.$inject = ['Place', '$state'];

function PlacesEditCtrl(Place, $state) {
  this.place = {};

  Place.findById($state.params.id)
    .then(res => this.place = res.data);

  function handleSubmit() {
    Place.update(this.place)
      .then(() => $state.go('placesShow', { id: $state.params.id }));
  }
  this.handleSubmit = handleSubmit;
}

export default PlacesEditCtrl;
