LocationsIndexCtrl.$inject = ['Location'];

function LocationsIndexCtrl(Location){
  const vm = this;

  vm.allLocations = [];

  Location.find()
    // .then(res => vm.allLocations = res.data);
    .then(res => console.log(res.data));
}
export default LocationsIndexCtrl;
