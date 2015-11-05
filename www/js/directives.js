angular.module('app.directives', [])

.directive('barcodeImage', [function () {
  function link(scope, element, attrs) {
    var settings = {
      barWidth: 1,
      barHeight: 50,
      moduleSize: 5,
      showHRI: true,
      addQuietZone: true,
      marginHRI: 5,
      bgColor: "#FFFFFF",
      color: "#000000",
      fontSize: 10,
      output: "css",
      posX: 0,
      posY: 0
    };
    $(element).barcode(scope.barcodeValue, "EAN_13", settings);
    scope.$watch('barcodeValue', function (value) {
      if (value.length > 12) {
        $(element).barcode(value, "EAN_13", settings);
      }
    });

  }
  return {
    restrict: 'A',
    scope: {
      barcodeValue: '='
    },
    link: link
  };
}]);
