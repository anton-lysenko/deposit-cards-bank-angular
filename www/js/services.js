angular.module('app.services', [])

.factory('BlankFactory', [function () {

}])

.factory('Camera', ['$q', function ($q) {

    return {
      getPicture: function (options) {
        var q = $q.defer();

        navigator.camera.getPicture(function (result) {
          // Do any magic you need
          q.resolve(result);
        }, function (err) {
          q.reject(err);
        }, options);

        return q.promise;
      }
    }
}])
  .factory('NewCard', [function () {
    var discountCard = {
      card: {},
      reset: function () {
        this.card = {
          name: 'Card ...',
          description: 'Card description',
          barcode: {
            format: 'ean13',
            value: '0000000000000'
          },
          cardPhoto: '',
          category: 'common',
          imgSrc: ''
        }
      }
    }

    discountCard.reset();

    return discountCard;
}])
  .factory('CardsManager', ['$localstorage', function ($localstorage) {

    var cards = $localstorage.getArray('Fishka');
    var cardsManager = {
      addCard: function(Card) {
        var newCardsList = [];
        storedCards = $localstorage.getArray('discount_cards');
        newCardsList = storedCards.slice();
        newCardsList.push(Card);
        $localstorage.setArray('discount_cards', newCardsList);
      },
      getCardsList: function() {
        return $localstorage.getArray('discount_cards');
      }
    }
    return cardsManager;
}])

.factory('$localstorage', ['$window', function ($window) {
  return {
    set: function (key, value) {
      $window.localStorage[key] = value;
    },
    get: function (key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setArray: function (key, value) {
      $window.localStorage[key] = JSON.stringify(value, null);
    },
    getArray: function (key) {
      return JSON.parse($window.localStorage[key] || '[]');
    }
  }
}]);
