// secureState.$inject = ['$state'];
/* global navigator */

MainCtrl.$inject = ['$auth', '$state', '$rootScope', '$timeout'];
function MainCtrl($auth, $state, $rootScope, $timeout){
  this.isAuthenticated = $auth.isAuthenticated;

  function logout(){
    $auth.logout();
    $state.go('index');
  }

  $rootScope.$on('flashMessage', (e, data) => {
    this.flashMessage = data;

    $timeout(() => this.flashMessage = null, 3000);
  });

  this.logout = logout;
}
export default MainCtrl;
