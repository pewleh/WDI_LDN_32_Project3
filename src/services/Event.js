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

<<<<<<< HEAD
  function remove(event) {
    return $http.delete(`/api/events/${event._id}`);
  }
  // point this at the api
  function createComment(comment, eventId) {
    return $http.put(`/api/events/${eventId}.comments`, comment);
=======
  function createComment(comment, event){
    return $http.post(`/api/events/${event._id}/comments`, comment);
  }

  function deleteComment(comment, event){
    return $http.delete(`/api/events/${event._id}/comments/${comment._id}`);
>>>>>>> development
  }

  function imageCreate(event, data) {
    // console.log('event in service', event);
    // console.log('image in service', data);
    return $http.post(`/api/events/${event._id}/images`, data);
  }

  this.findEvent = findEvent;
  this.create = create;
  this.findById = findById;
  this.update = update;
  this.remove = remove;
  this.createComment = createComment;
<<<<<<< HEAD
  this.imageCreate = imageCreate;
=======
  this.deleteComment = deleteComment;
>>>>>>> development
}
export default Event;
