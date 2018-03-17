Event.$inject = ['$http'];

function Event($http) {

  function findEvent() {
    return $http.get('/api/events');
  }

  function create(event) {
    return $http.post('/api/events', event);
  }

  function findById(id) {
    return $http.get(`/api/events/${id}`);
  }

  function update(event){
    return $http.put(`/api/events/${event._id}`, event);
  }

  function remove(event) {
    return $http.delete(`/api/events/${event._id}`);
  }

  this.findEvent = findEvent;
  this.create = create;
  this.findById = findById;
  this.remove = remove;
  this.update = update;
}
export default Event;
