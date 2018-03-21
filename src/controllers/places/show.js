PlacesShowCtrl.$inject = ['Place', 'User', '$state', '$window'];

function PlacesShowCtrl(Place, User, $state, $window) {

  const vm = this;

  this.place = {};
  this.currentUser = $window.localStorage.getItem('userId');
  this.comment = {
    user: this.currentUser
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

  this.remove = remove;

  function submitComment() {
    Place.createComment(vm.comment ,vm.place)
      .then(() => $state.go($state.current, {}, {reload: true}));
  }

  this.submitComment = submitComment;

  function deleteComment() {
    Place.deleteComment(vm.comment ,vm.place)
      .then(() => $state.go($state.current, {}, {reload: true}));
  }

  this.deleteComment = deleteComment;


}

export default PlacesShowCtrl;
