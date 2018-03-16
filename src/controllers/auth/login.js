AuthLoginCtrl.$inject = ['$auth', '$state', '$rootScope'];

function AuthLoginCtrl($auth, $state, $rootScope){
  this.credentials = {};

  function authenticate(provider){
    $auth.authenticate(provider);
  }

  function handleSubmit(){
    $auth.login(this.credentials)
      .then(res => {

        $rootScope.$broadcast('flashMessage', {
          type: 'success',
          content: res.data.message
        });
        $state.go('eventsIndex');
      });

  }
  this.handleSubmit = handleSubmit;
  this.authenticate = authenticate;
}
export default AuthLoginCtrl;
