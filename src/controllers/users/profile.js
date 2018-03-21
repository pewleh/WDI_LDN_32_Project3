UsersProfileCtrl.$inject = ['User', '$state', '$scope'/*, '$window', 'filepickerService'*/];


function UsersProfileCtrl(User, $state, $scope/*, $window, filepickerService*/) {
  this.user = {};

  const vm = this;
  // $scope.avatar = null;

  User.findById($state.params.id)
    .then(res => {
      // console.log(res.data);
      this.user = res.data;
      // $scope.avatar = res.data.avatar;
    });

  // setTimeout(() => {
  //   this.user.username = 'Hello mate';
  // }, 3000);

  function remove() {
    User.remove(this.user)
      .then(() => $state.go('placesIndex'));
  }

  // function getAvatarFromFilepicker() {
  //   filepickerService.pick({mimetype: 'image/*'}, (data) => {
  //     $scope.avatar = data.url;
  //     $scope.$digest();
  //   });
  // }

  this.remove = remove;

  function savePic() {
    console.log('EVENT', vm.user);
    User
      .update(vm.user)
      .then(res => console.log(res));
  }

  this.savePic = savePic;
  // this.getAvatarFromFilepicker = getAvatarFromFilepicker;
}

export default UsersProfileCtrl;
