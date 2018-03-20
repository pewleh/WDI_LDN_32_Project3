Place.$inject = ['$http'];

function Place($http) {

  function findById(id) {
    return $http.get(`/api/users/${id}`);
  }

  function update(user) {
    return $http.put(`/api/users/${user._id}`, user);
  }

  function remove(user) {
    return $http.delete(`/api/users/${user._id}`);
  }

  this.findById = findById;
  this.update = update;
  this.remove = remove;
}
export default Place;
