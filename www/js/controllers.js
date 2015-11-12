angular.module('app.controllers', ['ngCordova', 'app.services', 'ionic'])

.controller('discountCardsCtrl', function ($scope, $state, CardsManager, $stateParams) {
  $scope.addCard = function () {
    $state.go('enterNewCardName');
  }

  $scope.cardsList = CardsManager.getCardsList();

  $scope.openCard = function (cardName) {
    $state.go('discountCard', {
      name: cardName
    });
  }
  if ($stateParams.updated == true) {
    $scope.cardsList = CardsManager.getCardsList();
    $stateParams.updated = false;
  }
})

.controller('discountCardCtrl', function ($scope, $stateParams) {
    var vm = $scope;
    vm.cardName = $stateParams.name;
    $stateParams.name = '';
  })
  .controller('newCardNameCtrl', function ($scope, $state, NewCard) {
    var vm = $scope;
    vm.newCard = NewCard.card;
    vm.next = function () {
      NewCard.card = vm.newCard;
      $state.go('selectCardCategory');
    }
  })
  .controller('selectCardCategoryCtrl', function ($scope, $state, NewCard) {
    var vm = $scope;
    vm.newCard = NewCard.card;
    vm.cardCategories = [
      {
        text: 'Common',
        value: 'common'
    },
      {
        text: 'Food',
        value: 'food'
    },
      {
        text: 'Cosmetics',
        value: 'cosmetics'
    },
      {
        text: 'Sports goods',
        value: 'sports_goods'
    },
      {
        text: 'Clothes',
        value: 'clothes'
    },
      {
        text: 'Electronics',
        value: 'electronics'
    },
  ];
    vm.next = function () {
      NewCard.card.category = vm.newCard.category;
      $state.go('addCardBarcode');
    }
  })
  .controller('addCardBarcodeCtrl', function ($scope, $state, $ionicPlatform, $cordovaBarcodeScanner, NewCard) {
    var vm = $scope;
    $ionicPlatform.ready(function () {
      vm.newCard = NewCard.card;
      vm.scanBarcode = function () {
        $cordovaBarcodeScanner
          .scan()
          .then(function (barcodeData) {
            vm.newCard.barcode.value = barcodeData.text;
            vm.newCard.barcode.format = barcodeData.format;
          }, function (error) {
            alert(error);
          });

      }

      vm.next = function () {
        NewCard.card = vm.newCard;
        $state.go('addCardPhoto');
      }

    });
    NewCard.reset();
  })

.controller('addCardPhotoCtrl', function ($scope, $state, $ionicPlatform, NewCard, $cordovaCamera, CardsManager) {
  $ionicPlatform.ready(function () {
    var options = {
      quality: 75,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 320,
      targetHeight: 480,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    $scope.getPhoto = function () {
      $cordovaCamera.getPicture(options).then(function (imageData) {
        var image = document.getElementById('myImage');
        $scope.lastPhoto = "data:image/jpeg;base64," + imageData;
        NewCard.card.cardPhoto = $scope.lastPhoto;
      }, function (err) {
        // error
      });
    }

    $scope.createCard = function () {
      CardsManager.addCard(NewCard.card);
      NewCard.reset();
      $state.go('discountCards', {
        updated: true
      });
    }
  });

})
