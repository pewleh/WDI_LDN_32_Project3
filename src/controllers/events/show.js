EventsShowCtrl.$inject = ['Event', '$state'];
function EventsShowCtrl(Event, $state) {
  this.event = {};

  Event.findById($state.params.id)
    .then(res => this.event = res.data);

  function remove() {
    Event.remove(this.event)
      .then(() => $state.go('eventsIndex'));
  }

  this.remove = remove;
}

export default EventsShowCtrl;
