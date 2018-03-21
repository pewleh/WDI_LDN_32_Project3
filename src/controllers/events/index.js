EventsIndexCtrl.$inject = ['Event'];

function EventsIndexCtrl(Event){
  const vm = this;

  vm.dateObjects = [];

  Event.findEvent()
    .then(res => {
      // This sorts them by date.
      // Push all dates into an array
      const allDates = Array.from(new Set(res.data.map(event => event.date)));
      // Remove Duplicate Dates from the Array
      // This should push an Object with date: event.date and events: []
      vm.dateObjects = allDates.map(date => ({
        date: date,
        events: res.data.filter(event => event.date === date)
      }));
    });
}
export default EventsIndexCtrl;
