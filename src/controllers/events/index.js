EventsIndexCtrl.$inject = ['Event'];

function EventsIndexCtrl(Event){
  const vm = this;

  vm.allEvents = [];

  Event.findEvent()
    .then(res => {
      // This sorts them by date.
      vm.allEvents = res.data.sort((a,b) => a.date - b.date );
    });
}
export default EventsIndexCtrl;
