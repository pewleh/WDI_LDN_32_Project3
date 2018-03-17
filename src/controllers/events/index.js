EventsIndexCtrl.$inject = ['Event'];

function EventsIndexCtrl(Event){
  const vm = this;

  vm.allEvents = [];

  Event.findEvent()
    .then(res => vm.allEvents = res.data)
    .then(res => console.log(res.data));
}
export default EventsIndexCtrl;
