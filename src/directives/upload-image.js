uploadImage.$inject = ['filepickerService'];
function uploadImage(filepickerService) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: (scope, element, attrs, model) => {
      element.on('click', (e) => {
        console.log('I have been clicked');
        e.preventDefault();

        filepickerService
          .pick({ mimetype: 'image/*' }, (data) => {
            model.$setViewValue(data.url);
            console.log(data.url);
          });
      });
    }
  };
}

export default uploadImage;
