EventsNewCtrl.$inject = ['Event', '$state'];


function EventsNewCtrl(Event, $state) {
  this.newEvent = {};

  function handleSubmit() {
    if(this.form.$invalid) return false;
    Event.create(this.newEvent)
      .then(() => $state.go('eventsIndex'));
  }
  this.handleSubmit = handleSubmit;
}

export default EventsNewCtrl;
