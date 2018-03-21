EventsShowCtrl.$inject = ['Event', 'User', 'Place', '$state', '$window'];
function EventsShowCtrl(Event, User, Place, $state, $window) {
  const vm = this;
  this.event = {};
  this.currentUser = $window.localStorage.getItem('userId');
  this.comment = {
    user: this.currentUser,
    event: $state.params.id
  };

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

// replace with createcomment restfulroute
  function submitComment() {
    console.log($window.localStorage.getItem('userId'));
    Event.findById(vm.event._id)
      .then(event => {
        event.data.comments.push(vm.comment);
        return Event.update(event.data);
      })
      .then(() => User.findById(vm.currentUser))
      .then(user => {
        user.data.comments.push(vm.comment);
        return User.update(user.data);
      })
      .then(() => $state.go($state.current, {}, {reload: true}));
  }

  this.submitComment = submitComment;

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

}

export default EventsShowCtrl;

// watch this.event.userImages for cahnges
// when it changes, Event.update(this.event)
