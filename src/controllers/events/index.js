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
      console.log(vm.allEvents);
      // Push all dates into an array
      vm.allEvents.forEach(event => vm.allDates.push(event.date));
      // Remove Duplicate Dates from the Array
      vm.allDates = vm.allDates.filter((item, pos, ary) => !pos || item !== ary[pos - 1]);
      console.log(vm.allDates);
      // This should push an Object with date: event.date and events: []
      vm.allDates.forEach(date => vm.dateObjects.push(Object.assign({}, {'date': date, 'events': []})));
      console.log(vm.dateObjects);
      // Then fill that array with Events on that day by filtering vm.allEvents for event.date === allDates[i]
      vm.dateObjects.forEach(date => {
        console.log('todays date is ',date.date);
        const todaysEvents = vm.allEvents.filter(event => event.date === date.date);
        console.log('todays events are ',todaysEvents);
        todaysEvents.forEach(event => date.events.push(event));
      });
      console.log('Here are the new dateObjects');
      console.log(vm.dateObjects);
    });
}
export default EventsIndexCtrl;
