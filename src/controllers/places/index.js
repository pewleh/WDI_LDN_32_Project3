PlacesIndexCtrl.$inject = ['Place'];

function PlacesIndexCtrl(Place){
  const vm = this;

  vm.allPlaces = [];

  Place.findPlace()
    .then(res => vm.allPlaces = res.data);
}
export default PlacesIndexCtrl;
