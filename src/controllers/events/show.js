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
    if(vm.event.type === 'Asteroid') {
      return true;
    }
  }

  this.isAsteroid = isAsteroid;

  function isSatellite() {
    if(vm.event.type === 'Satellite') {
      return true;
    }
  }

  this.isSatellite = isSatellite;

}

export default EventsShowCtrl;
