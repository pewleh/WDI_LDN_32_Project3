uploadImage.$inject = ['filepickerService'];
function uploadImage(filepickerService) {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: (scope, element, attrs, model) => {
      element.bind('click', (e) => {
        console.log('clicked');
        e.preventDefault();

        filepickerService
          .pick({ mimetype: 'image/*' }, (data) => {
            console.log(data.url);
            model.$setViewValue(data.url);
          });
      });
    }
  };
}

export default uploadImage;
