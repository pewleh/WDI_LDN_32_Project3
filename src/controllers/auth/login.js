AuthLoginCtrl.$inject = ['$auth', '$state', '$rootScope'];

// Require User model


function AuthLoginCtrl($auth, $state, $rootScope){
  this.credentials = {};

  function authenticate(provider){
    $auth.authenticate(provider);
  }

  function handleSubmit(){
    $auth.login(this.credentials)
      .then(res => {

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
      })
      .catch(
        console.log('wrong Password Bro'),
        $rootScope.$broadcast('flashMessage', {
          type: 'danger',
          content: 'Wrong Email or Password'
        })
      );

  }
  this.handleSubmit = handleSubmit;
  this.authenticate = authenticate;
}
export default AuthLoginCtrl;
