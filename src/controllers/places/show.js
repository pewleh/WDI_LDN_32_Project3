PlacesShowCtrl.$inject = ['Place', 'User', '$state', '$window'];

function PlacesShowCtrl(Place, User, $state, $window) {

  const vm = this;

  this.place = {};
  this.currentUser = $window.localStorage.getItem('userId');
  this.comment = {
    user: this.currentUser,
    place: $state.params.id
  };

  Place.findById($state.params.id)
    .then(res => this.place = res.data);

  function addFavoriteLocation() {
    User.findById(vm.currentUser)
      .then(user => {
        user.data.favoriteLocations.push($state.params.id);
        User.update(user.data);
      });
  }

  this.addFavoriteLocation = addFavoriteLocation;

  function remove() {
    Place.remove(this.place)
      .then(() => $state.go('placesIndex'));
  }

  function submitComment() {
    Place.findById(vm.place._id)
      .then(place => {
        place.data.comments.push(vm.comment);
        Place.update(place.data);
      })
      .then(() => User.findById(vm.currentUser))
      .then(user => {
        user.data.comments.push(vm.comment);
        User.update(user.data);
      })
      .then(() => $state.go($state.current, {}, {reload: true}));
  }

  this.submitComment = submitComment;

  this.remove = remove;
}

export default PlacesShowCtrl;
