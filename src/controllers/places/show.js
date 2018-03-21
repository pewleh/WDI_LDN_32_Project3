PlacesShowCtrl.$inject = ['Place', 'User', '$state', '$window', '$auth'];

function PlacesShowCtrl(Place, User, $state, $window, $auth) {

  const vm = this;

  this.place = {};
  this.currentUser = $auth.getPayload().sub;
  this.comment = {
    userId: this.currentUser
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
    vm.place.comments.push(vm.comment);
    Place.createComment(vm.comment ,vm.place);

  }

  this.submitComment = submitComment;

  function deleteComment(comment) {
    Place.deleteComment(comment ,vm.place);
    const index = vm.place.comments.indexOf(comment);
    vm.place.comments.splice(index, 1);
  }

  this.deleteComment = deleteComment;


}

export default PlacesShowCtrl;
