/* global navigator */

MainCtrl.$inject = ['$auth', '$state', '$rootScope', '$timeout'];

function MainCtrl($auth, $state, $rootScope, $timeout) {
  const vm = this;

  // vm.userId = $auth.getPayload().sub;
  // vm.admin = $auth.getPayload().admin;
  vm.clicked = false;


  function logout() {
    vm.userId = false;
    vm.admin = false;
    $auth.logout();
    $state.go('eventsIndex');
  }

  vm.logout = logout;

  $rootScope.$on('login', (e, data) => {
    vm.userId = data.content.userId;
    vm.admin = data.content.admin;
    console.log(vm.userId);
    console.log(vm.admin);
  });

  $rootScope.$on('flashMessage', (e, data) => {
    console.log(data);
    vm.flashMessage = data;

    $timeout(() => vm.flashMessage = null, 3000);
  });

}

export default MainCtrl;
