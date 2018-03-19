AuthRegisterCtrl.$inject = ['$auth', '$state'];

function AuthRegisterCtrl($auth, $state){
  const vm = this;
  this.user = {};

  function handleSubmit(){
    console.log(this.user);
    console.log(vm.user);
    $auth.signup(this.user)
      .then(() => $state.go('login'));
  }
  this.handleSubmit = handleSubmit;
}
export default AuthRegisterCtrl;
