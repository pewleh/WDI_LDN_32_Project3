PlacesIndexCtrl.$inject = ['Place'];

function PlacesIndexCtrl(Place){
  const vm = this;

  vm.allPlaces = [];

  Place.findPlace()
    .then(res => vm.allPlaces = res.data[0]);
    // .then(res => console.log(res.data[0]));
}
export default PlacesIndexCtrl;
