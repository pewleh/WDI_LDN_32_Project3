UsersProfileCtrl.$inject = ['User', '$state'];


function UsersProfileCtrl(User, $state,) {
  const vm = this;
  vm.user = {};


  User.findById($state.params.id)
    .then(res => {
      vm.user = res.data;
    });


  function remove() {
    User.remove(vm.user)
      .then(() => $state.go('placesIndex'));
  }

  vm.remove = remove;

  function savePic() {
    console.log('EVENT', vm.user);
    User
      .update(vm.user)
      .then(res => console.log(res));
  }

  vm.savePic = savePic;
  vm.favsAreVisible = false;

  function toggleFavorites() {
    vm.favsAreVisible = !vm.favsAreVisible;
  }

  vm.toggleFavorites = toggleFavorites;
}

export default UsersProfileCtrl;
