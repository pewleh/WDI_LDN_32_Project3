UsersProfileCtrl.$inject = ['User', '$state'];


function UsersProfileCtrl(User, $state) {

  this.user = {};

  User.findById($state.params.id)
    .then(res => {
      console.log(res.data);
      this.user = res.data;
    });

  function remove() {
    User.remove(this.user)
      .then(() => $state.go('placesIndex'));
  }

  this.remove = remove;
}

export default UsersProfileCtrl;
