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
          content: 'Thank you for signing up. Please log in.'
        });
        $state.go('login');
      });
  }
  this.handleSubmit = handleSubmit;
}
export default AuthRegisterCtrl;
