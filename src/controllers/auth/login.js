AuthLoginCtrl.$inject = ['$auth', '$state', '$rootScope', '$cookies'];

// Require User model


function AuthLoginCtrl($auth, $state, $rootScope, $cookies){
  this.credentials = {};

  function authenticate(provider){
    $auth.authenticate(provider);
  }

  function handleSubmit(){
    $auth.login(this.credentials)
      .then(res => {
        $cookies.put('userId', `${res.data.id}`);
        $cookies.put('admin', `${res.data.admin}`);
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
