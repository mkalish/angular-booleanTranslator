(function () {
    'use strict';

    angular.module('angular-booleanTranslator', []);

    angular
        .module('angular-booleanTranslator')
        .directive('booleanTranslator', booleanTranslator);

    /**
     * @ngdoc directive
     * @name edgBooleanTranslator
     * @module edge.common
     * @restrict E
     * @scope
     *
     * @description
     * Translate a boolean value to a display value
     *
     * NOTE: either a ```condition``` can be specified, not both
     *
     * @param {Boolean=} condition the boolean value to use
     * @param {String=} trueText the id of the label for true (default: yes)
     * @param {String=} falseText the id of the label for true (default: no)
     */

    /**@ngInject */
    function booleanTranslator() {
        return {
            restrict: 'E',
            scope: {
                condition: '='
            },
            template: '<span>{{condition ? trueText : falseText}}</span>',
            link: linkImpl
        };

        function linkImpl(scope, elm, attrs) {
            scope.trueText = attrs.trueText || 'Yes';
            scope.falseText = attrs.falseText || 'No';
        }
    }

    angular
      .module('angular-booleanTranslator')
      .directive('booleanInput', booleanInput);

    booleanInput.$inject = ['$log'];

    function booleanInput($log) {
      return {
        restrict: 'E',
        template: createTemplate,
        require: 'ngModel',
        link: linkImpl
      };

      function linkImpl(scope, elm, attrs, ngModel) {
        var trueInput = angular.element(elm.find('input')[0]);
        var falseInput = angular.element(elm.find('input')[1]);

        trueInput.on('change', function () {
          ngModel.$setTouched();
          ngModel.$setDirty();
          falseInput.prop('checked', false);
          ngModel.$setViewValue(true);
          scope.$apply();
        });

        falseInput.on('change', function () {
          ngModel.$setTouched();
          ngModel.$setDirty();
          trueInput.prop('checked', false);
          ngModel.$setViewValue(false);
          scope.$apply();
        });

        ngModel.$render = function () {
          var value = ngModel.$modelValue;
          if(angular.isDefined(value)) {
            if(value === true) {
              falseInput.prop('checked', false);
              trueInput.prop('checked', true);
            } else if(value === false) {
              falseInput.prop('checked', true);
              trueInput.prop('checked', false);
            } else {
              $log.error('setting a boolean model to non boolean', value);
              throw new Error('Do not set a boolean to non boolean')
            }
          } else {
            trueInput.prop('checked', false);
            falseInput.prop('checked', false);
          }
        }
      }

      function createTemplate(elm, attrs) {
        var isSpread = attrs.layout === 'spread';
        var trueText = attrs.trueText || 'Yes';
        var falseText = attrs.falseText || 'No';

        if(isSpread) {
          return '<div>' +
            '<span><label>' + trueText + '</label></span>' +
            '<span><input type="radio" name="'+ attrs.name + '" value="true"/></span>' +
            '<span><label>' + falseText + '</label></span>' +
            '<span><input type="radio" name="'+ attrs.name + '" value="false"/></span>'
            '</div>'
        } else {
          return '<div>' +
            '<div><label>' + trueText + '</label></div>' +
            '<div><input type="radio" name="'+ attrs.name + '" value="true"/></div>' +
            '<div><label>' + falseText + '</label></div>' +
            '<div><input type="radio" name="'+ attrs.name + '" value="false"/></div>'
            '</div>'
        }
       }
    }
})();
