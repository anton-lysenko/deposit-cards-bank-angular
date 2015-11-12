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
        $(element).barcode(scope.barcodeValue, scope.barcodeFormat, settings);
        scope.$watch('barcodeValue', function (value) {
            switch (scope.barcodeFormat) {
//                case "std25":
//                case "int25":
//                    break;
                case 'EAN_8':
                    $(element).barcode(value, 'ean8', settings);
                    break;
                case "EAN_13":
                    $(element).barcode(value, 'ean13', settings);
                    break
//                case "upc":
//                    break;
//                case "code11":
//                    break;
//                case "code39":
//                    break;
//                case "code93":
//                    break;
//                case "code128":
//                    break;
//                case "codabar":
//                    break;
//                case "msi":
//                    break;
//                case "datamatrix":
//                    break
            }
        });

    }
    return {
        restrict: 'A',
        scope: {
            barcodeValue: '=',
            barcodeFormat: '='
        },
        link: link
    };
}]);
