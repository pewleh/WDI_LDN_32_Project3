PlacesShowCtrl.$inject = ['Place', '$state'];

function PlacesShowCtrl(Place, $state) {
  this.place = {};

  Place.findById($state.params.id)
    // .then(res => this.place = res.data);
    .then(res => console.log(res.data));

}

export default PlacesShowCtrl;
