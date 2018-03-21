UsersProfileCtrl.$inject = ['User', '$state', '$scope'/*, '$window', 'filepickerService'*/];


function UsersProfileCtrl(User, $state, $scope/*, $window, filepickerService*/) {
  this.user = {};
  // $scope.avatar = null;

  User.findById($state.params.id)
    .then(res => {
      // console.log(res.data);
      this.user = res.data;
      $scope.avatar = res.data.avatar;
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
  // this.getAvatarFromFilepicker = getAvatarFromFilepicker;
}

export default UsersProfileCtrl;
