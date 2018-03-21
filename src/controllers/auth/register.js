AuthRegisterCtrl.$inject = ['$auth', '$state', '$rootScope'];

// inject
function AuthRegisterCtrl($auth, $state, $rootScope){
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
      });
  }
  this.handleSubmit = handleSubmit;
}
export default AuthRegisterCtrl;
