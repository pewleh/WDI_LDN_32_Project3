EventsIndexCtrl.$inject = ['Event'];

function EventsIndexCtrl(Event){
  const vm = this;

  vm.allEvents = [];


  Event.find()
    .then(res => vm.allEvents = res.data[0]);
  // .then(res => console.log(res.data[0]));
}
export default EventsIndexCtrl;
