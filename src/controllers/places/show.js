PlacesShowCtrl.$inject = ['Place', 'User', '$state', '$cookies'];

function PlacesShowCtrl(Place, User, $state, $cookies) {
  const vm = this;
  this.place = {};
  this.currentUser = $cookies.get('userId');

  Place.findById($state.params.id)
    .then(res => this.place = res.data);

  function addFavoriteLocation() {
    User.findById(vm.currentUser)
      .then(user => {
        user.data.favoriteLocations.push($state.params.id);
        console.log(user.data);
        User.update(user.data);
      });
  }

  this.addFavoriteLocation = addFavoriteLocation;

  function remove() {
    Place.remove(this.place)
      .then(() => $state.go('placesIndex'));
  }

  this.remove = remove;
}

export default PlacesShowCtrl;
