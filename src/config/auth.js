Auth.$inject = ['$authProvider'];

function Auth ($authProvider){
  $authProvider.signupUrl = '/api/register';
  $authProvider.loginUrl = '/api/login';

  $authProvider.facebook({
    clientId: '2022981871052298',
    url: 'api/facebook'
  });
}

export default Auth;
//we can stick in the facebook and google login id//urls etc here after mvp.
