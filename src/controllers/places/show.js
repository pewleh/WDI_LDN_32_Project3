PlacesShowCtrl.$inject = ['Place', '$state'];

function PlacesShowCtrl(Place, $state) {
  this.place = {};

  Place.findById($state.params.id)
    .then(res => this.place = res.data);

  function remove() {
    Place.remove(this.place)
      .then(() => $state.go('placesIndex'));
  }

  this.remove = remove;
}

export default PlacesShowCtrl;
