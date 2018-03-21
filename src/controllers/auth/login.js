AuthLoginCtrl.$inject = ['$auth', '$state', '$rootScope', '$window'];

// Require User model


function AuthLoginCtrl($auth, $state, $rootScope, $window){
  this.credentials = {};

  function authenticate(provider){
    $auth.authenticate(provider);
  }

  function handleSubmit(){
    $auth.login(this.credentials)
      .then(res => {
        $window.localStorage.setItem('userId', `${res.data.id}`);
        $window.localStorage.setItem('admin', `${res.data.admin}`);
        
        $rootScope.$broadcast('login', {
          content: {
            userId: res.data.id,
            admin: res.data.admin
          }
        });
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
