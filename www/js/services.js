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
.factory('NewCard', [function(){
  var discountCard = {
    barcode: {
      format: 'ean13',
      value: '0000000000000'
    },
    cardPhoto: '',
    category: 'common',
    imgSrc: ''
  }
  return discountCard;
}])
.service('BlankService', [function(){

}])
.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value, null);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}]);

