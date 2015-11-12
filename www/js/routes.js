angular.module('app.routes', [])

.config(function ($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



    .state('discountCards', {
      url: '/Cards_list',
      templateUrl: 'templates/discountCards.html',
      controller: 'discountCardsCtrl',
      params: {
        updated: false
      }
    })
    .state('discountCard', {
      url: '/discount_card',
      templateUrl: 'templates/discountCard.html',
      controller: 'discountCardCtrl',
      params: {
        name: ''
      }
    })
    .state('comfyDiscount', {
      url: '/comfy_discount',
      templateUrl: 'templates/comfyDiscount.html',
      controller: 'comfyDiscountCtrl'
    })
    .state('enterNewCardName', {
      url: '/new_card_name',
      templateUrl: 'templates/newCardName.html',
      controller: 'newCardNameCtrl'
    })
    .state('selectCardCategory', {
      url: '/add_card_category',
      templateUrl: 'templates/selectCardCategory.html',
      controller: 'selectCardCategoryCtrl'
    })
    .state('addCardBarcode', {
      url: '/add_card_barcode',
      templateUrl: 'templates/addCardBarcode.html',
      controller: 'addCardBarcodeCtrl'
    })
    .state('addCardPhoto', {
      url: '/add_card_photo',
      templateUrl: 'templates/addCardPhoto.html',
      controller: 'addCardPhotoCtrl'
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/Cards_list');

});
