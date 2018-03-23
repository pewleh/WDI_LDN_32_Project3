PlacesShowCtrl.$inject = ['Place', 'User', '$state', '$auth'];

function PlacesShowCtrl(Place, User, $state, $auth) {

  const vm = this;

  this.place = {};
  
  Place.findById($state.params.id)
    .then(res => this.place = res.data);

  function addFavoriteLocation() {
    const activeUser = $auth.getPayload().sub;
    User.findById(activeUser)
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
    const activeUser = $auth.getPayload().sub;
    Place.createComment(vm.comment ,vm.place)
      .then(() => User.findById(activeUser))
      .then((user) => vm.comment.username = user.data.username)
      .then(() => vm.place.comments.push(vm.comment))
      .then(() => vm.comment = {});
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
