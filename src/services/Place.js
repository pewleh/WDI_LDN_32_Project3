Place.$inject = ['$http'];

function Place($http) {

  function findPlace() {
    return $http.get('/api/places');
  }

  function create(place) {
    return $http.post('/api/places', place);
  }

  function findById(id) {
    return $http.get(`/api/events/${id}`);
  }

  this.findPlace = findPlace;
  this.create = create;
  this.findById = findById;
}
export default Place;
