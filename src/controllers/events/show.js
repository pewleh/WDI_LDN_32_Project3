EventsShowCtrl.$inject = ['Event', '$state'];
function EventsShowCtrl(Event, $state) {
  const vm = this;
  this.event = {};
  this.comment = '';

  Event.findById($state.params.id)
    .then(event => this.event = event.data);

  function remove() {
    Event.remove(vm.event)
      .then(() => $state.go('eventsIndex'));
  }

  this.remove = remove;

  function submitComment() {
    Event.findById(vm.event._id)
      .then(event => {
        event.data.comments.push(vm.comment);
        Event.update(event.data);
      })
      .then(() => $state.go($state.current, {}, {reload: true}));

  }

  this.submitComment = submitComment;

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
