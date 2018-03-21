EventsIndexCtrl.$inject = ['Event'];

function EventsIndexCtrl(Event){
  const vm = this;

  vm.allEvents = [];

  vm.allDates = [];

  vm.dateObjects = [];

  Event.findEvent()
    .then(res => {
      // This sorts them by date.
      vm.allEvents = res.data.sort((a,b) => a.date - b.date );
      // Push all dates into an array
      vm.allEvents.forEach(event => vm.allDates.push(event.date));
      // Remove Duplicate Dates from the Array
      vm.allDates = vm.allDates.filter((item, pos, ary) => !pos || item !== ary[pos - 1]);
      // This should push an Object with date: event.date and events: []
      vm.allDates.forEach(date => vm.dateObjects.push(Object.assign({}, {'date': date, 'events': []})));
      // Then fill that array with Events on that day by filtering vm.allEvents for event.date === allDates[i]
      vm.dateObjects.forEach(date => {
        const todaysEvents = vm.allEvents.filter(event => event.date === date.date);
        todaysEvents.forEach(event => date.events.push(event));
      });
    });
}
export default EventsIndexCtrl;
