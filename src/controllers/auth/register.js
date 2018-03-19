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
          content: 'All set!' //Dont think we need to ask it to login since it directs you straight to login.
        });
        $state.go('login');
      });
  }
  this.handleSubmit = handleSubmit;
}
export default AuthRegisterCtrl;
