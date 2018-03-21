EventsShowCtrl.$inject = ['Event', 'User', '$state', '$window'];
function EventsShowCtrl(Event, User, $state, $window) {
  const vm = this;
  this.event = {};
  this.currentUser = $window.localStorage.getItem('userId');
  this.comment = {
    user: this.currentUser,
    event: $state.params.id
  };

  Event.findById($state.params.id)
    .then(event => this.event = event.data);

  function remove() {
    Event.remove(vm.event)
      .then(() => $state.go('eventsIndex'));
  }

  this.remove = remove;

// replace with createcomment restfulroute
  function submitComment() {
    console.log($window.localStorage.getItem('userId'));
    Event.findById(vm.event._id)
      .then(event => {
        event.data.comments.push(vm.comment);
        Event.update(event.data);
      })
      .then(() => User.findById(vm.currentUser))
      .then(user => {
        user.data.comments.push(vm.comment);
        User.update(user.data);
      })
      .then(() => $state.go($state.current, {}, {reload: true}));
  }

  this.submitComment = submitComment;

  function addFavoriteEvent() {
    User.findById(vm.currentUser)
      .then(user => {
        user.data.favoriteEvents.push($state.params.id);
        User.update(user.data);
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

}

export default EventsShowCtrl;
