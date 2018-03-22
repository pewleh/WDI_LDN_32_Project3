EventsShowCtrl.$inject = ['Event', 'User', 'Place', '$state', '$auth'];
function EventsShowCtrl(Event, User, Place, $state, $auth) {
  const vm = this;
  this.event = {};
  this.currentUser = false;
  this.comment = {
    userId: this.currentUser
  };

  if($auth.getPayload()) this.currentUser = $auth.getPayload().sub;

  vm.allPlaces = [];
  vm.event.image = null;

  Place.findPlace()
    .then(res => vm.allPlaces = res.data);

  Event.findById($state.params.id)
    .then(event => this.event = event.data);

  function remove() {
    Event.remove(vm.event)
      .then(() => $state.go('eventsIndex'));
  }
  this.remove = remove;

  function submitComment() {

    Event.createComment(vm.comment ,vm.event)
      .then(() => User.findById(vm.currentUser))
      .then((user) => vm.comment.username = user.data.username)
      .then(() => vm.event.comments.push(vm.comment));
  }
  this.submitComment = submitComment;

  function deleteComment(comment) {
    Event.deleteComment(comment ,vm.event);
    const index = vm.event.comments.indexOf(comment);
    vm.event.comments.splice(index, 1);
  }
  this.deleteComment = deleteComment;

  function addFavoriteEvent() {
    User.findById(vm.currentUser)
      .then(user => {
        user.data.favoriteEvents.push($state.params.id);
        return User.update(user.data);
      });
  }
  this.addFavoriteEvent = addFavoriteEvent;

  function isAsteroid() {
    return vm.event.type === 'Asteroid';
  }
  this.isAsteroid = isAsteroid;

  function isSatellite() {
    return vm.event.type === 'Satellite';
  }
  this.isSatellite = isSatellite;

  function isMeteorShower() {
    return vm.event.type === 'Meteor Shower';
  }
  this.isMeteorShower = isMeteorShower;

  // function savePic() {
  //   vm.trip.images.push(vm.trip.image);
  //   Trip
  //     .update({ tripId: vm.trip.id}, vm.trip)
  //     .$promise
  //     .then(() => {
  //       vm.trip.image = null;
  //     });
  //
  // }
  // vm.savePic = savePic;

  function savePic() {
    console.log('EVENT', vm.event);
    Event
      .imageCreate(vm.event, { src: vm.event.image })
      .then(res => console.log(res));
  }

  this.savePic = savePic;

}

export default EventsShowCtrl;

// watch this.event.userImages for cahnges
// when it changes, Event.update(this.event)
