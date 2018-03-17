Place.$inject = ['$http'];

function Place($http) {

  function findPlace() {
    return $http.get('/api/places');
  }

  this.findPlace = findPlace;
}
export default Place;
