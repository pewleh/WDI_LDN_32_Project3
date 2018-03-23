AuthRegisterCtrl.$inject = ['$auth', '$state', '$rootScope', 'User'];

// inject
function AuthRegisterCtrl($auth, $state, $rootScope, User){
  this.user = {};

  function handleSubmit(){
    console.log('signing up');
    console.log(this.user);
    $auth.signup(this.user)
      .then(() => {
        $rootScope.$broadcast('flashMessage', {
          type: 'success',
          content: 'All set, please log in now to enjoy all the benefits of being a member.'
        });
        $state.go('login');
      })
      .catch(() =>
        $rootScope.$broadcast('flashMessage', {
          type: 'danger',
          content: 'You need to completely fill out this form and upload an image.'
        }));
  }
  this.handleSubmit = handleSubmit;

  function savePic() {
    console.log('EVENT', this.user);
    User
      .create(this.user)
      .then(res => console.log(res));
  }

  this.savePic = savePic;
}
export default AuthRegisterCtrl;
