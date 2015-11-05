angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.factory('Camera', ['$q', function($q) {

  return {
    getPicture: function(options) {
      var q = $q.defer();

      navigator.camera.getPicture(function(result) {
        // Do any magic you need
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);

      return q.promise;
    }
  }
}])
.service('NewCard', [function(){
  var discountCard = {
    barcode: {
      format: '',
      value: '0000000000000'
    },
    cardPhoto: '',
    category: 'common'
  }
  return discountCard;
}])
.service('BlankService', [function(){

}]);

