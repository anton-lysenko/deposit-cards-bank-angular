angular.module('app.controllers', ['ngCordova', 'app.services', 'ionic'])

.controller('discountCardsCtrl', function ($scope, $state, $localstorage, NewCard) {
  $scope.addCard = function () {
    $state.go('selectCardCategory');
  }

})

.controller('comfyDiscountCtrl', function ($scope) {
    var vm = $scope;

  })
  .controller('selectCardCategoryCtrl', function ($scope, $state, NewCard) {
    var vm = $scope;
    vm.newCard = NewCard;
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
      NewCard.category = vm.newCard.category;
      $state.go('addCardBarcode');
    }
  })
  .controller('addCardBarcodeCtrl', function ($scope, $state, $ionicPlatform, $cordovaBarcodeScanner, NewCard, $localstorage) {
    var vm = $scope;
    $ionicPlatform.ready(function () {
      vm.newCard = NewCard;
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
        NewCard = vm.newCard;
        $state.go('addCardPhoto');
      }

    });

  })

.controller('addCardPhotoCtrl', function ($scope, $state, $ionicPlatform, NewCard, $cordovaCamera, $localstorage) {
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
        NewCard.cardPhoto = $scope.lastPhoto;
      }, function (err) {
        // error
      });
    }

    $scope.createCard = function () {
      $localstorage.setObject('Fishka', NewCard);
      NewCard = {};
      $state.go('discountCards');
    }
  });

})
